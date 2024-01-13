import {Card, Form} from 'react-bootstrap';
import * as React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {updateProfile} from '../../services/profileService';
import {useState} from 'react';
import {NotificationContainer, Notify} from '../updateProfileNotification';
import {getCurrencies} from '../../services/resourceService';
import Currency from '../../models/currency';
import User from '../../models/user';
import {NextPage} from 'next';
import GridContainer from '../../template/components/Grid/GridContainer';
import GridItem from '../../template/components/Grid/GridItem';
import InputType from './customControls/InputType';
import {MenuItem} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from '@material-ui/core/styles';
import CardBody from '../../template/components/Card/CardBody';
import {CardFooter} from 'reactstrap';
import SelectType from './customControls/SelectType';
import Button from '../../template/components/CustomButtons/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
import formStyle from '../../styles/form'

interface Props {
    profile: User,
    accessToken: string,
    config: any
}

const useStyles = makeStyles(formStyle);

const UpdateProfileForm: NextPage<Props> = ({profile: user, accessToken, config}) => {
    const classes = useStyles();
    const { control } = useForm();
    const [loading, setLoading] = useState(false)
    const [currencies, setCurrencies] = useState([]);
    if (currencies.length == 0) {
        getCurrencies(accessToken, config)
            .then((data: Currency[]) => {
                const result = [];
                data.forEach(c => result.push({label: c.nameEN, value: c.code}));
                return result;
            })
            .then(setCurrencies);
    }
    const methods = useForm();
    const handleServerValidationError = (error) => {
        Object.entries(error).forEach(([key, val]: [string, { constraints: string[] }]) => {
            methods.setError(key, {
                type: 'server',
                message: val.constraints.join(' ')
            })
        });
    }
    const onSubmit = data => {
        setLoading(true);
        updateProfile(
            accessToken,
            data,
            config
        )
            .then(() => {
                setLoading(false);
                Notify('success')
            })
            .catch(e => {
                setLoading(false);
                if (e.response.status == 400) {
                    handleServerValidationError(e.response.data.errors)
                    Notify('error', 'BadRequestError')
                } else {
                    Notify('error');
                }
            });
    }
    return (
        <>
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Card>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12} lg={12}>
                                <InputType
                                    labelText="Email"
                                    id="email"
                                    inputProps={{
                                        placeholder: 'Email',
                                        value: `${user && user.email}`,
                                        name: 'email',
                                        readOnly: true
                                    }}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                <InputType
                                    labelText="First Name"
                                    id="firstName"
                                    inputProps={{
                                        placeholder: 'First Name',
                                        defaultValue: `${user && user.firstName}`,
                                        name: 'firstName',
                                    }}
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} lg={6}>
                                <InputType
                                    labelText="Last Name"
                                    id="lastName"
                                    inputProps={{
                                        placeholder: 'Last Name',
                                        defaultValue: `${user && user.lastName}`,
                                        name: 'lastName',
                                    }}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <InputType
                                    labelText="Phone Number"
                                    id="phoneNumber"
                                    inputProps={{
                                        placeholder: 'Phone Number',
                                        defaultValue: `${user && user.phoneNumber}`,
                                        name: 'phoneNumber',
                                    }}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <SelectType
                                    id="default-Currency"
                                    name="defaultCurrencyId"
                                    label="Default Currency"
                                    control={control}
                                    defaultValue={user.defaultCurrencyId}
                                    className={classes.formControl}>
                                    {
                                        currencies.map(currency => <MenuItem key={currency.label}
                                            value={currency.value}>{currency.label}</MenuItem>)
                                    }
                                </SelectType>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={3}>
                                <SelectType
                                    id="preferred-Lang"
                                    name="preferredLang"
                                    label="Preferred Lang"
                                    control={control}
                                    defaultValue={user.preferredLang}
                                    className={classes.formControl}>
                                    <MenuItem key={"fr"} value={'fr'}>Français</MenuItem>
                                    <MenuItem key={"en"} value={'en'}>Anglais</MenuItem>
                                </SelectType>
                            </GridItem>
                        </GridContainer>

                    </CardBody>
                    <CardFooter>
                        <Button type='submit' endIcon={<SendIcon />} color="info" disabled={loading}>
                            {loading &&
                                <CircularProgress
                                    className={classes.spinner}
                                    size={20}
                                />
                            }
                            Update Profile
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        </FormProvider>
        <NotificationContainer/>
        </>
    );
}

export default UpdateProfileForm;