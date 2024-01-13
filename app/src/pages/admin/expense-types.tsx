import React, {useState} from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// layout for this page
import AdminLayout from'../../layouts/AdminLayout';
// core components
import GridItem from '../../template/components/Grid/GridItem';
import GridContainer from '../../template/components/Grid/GridContainer.js';
import Card from '../../template/components/Card/Card.js';
import CardHeader from '../../template/components/Card/CardHeader.js';
import CardBody from '../../template/components/Card/CardBody.js';
import {useAuth} from 'use-auth0-hooks';
import {useRouter} from 'next/router';
import ExpenseType from '../../models/expenseType';
import {getExpenseTypes} from '../../services/admin/expenseTypeService';
import Button from '../../template/components/CustomButtons/Button';
import ReactTable from '../../template/components/Table/ReactTable';
import styles from '../../styles/card';
import {GetServerSideProps} from 'next';
import getServerRuntimeConfig from '../../utils/getServerRuntimeConfig';

// @ts-ignore
const useStyles = makeStyles(styles);

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            serverSideConfig:  getServerRuntimeConfig()
        },
    }
}
const expTypes = ({serverSideConfig}) => {
    const classes = useStyles();
    let typesList : ExpenseType[] = []
    const [types, setTypes] = useState(typesList);
    const {isLoading, accessToken} = useAuth({
        audience: serverSideConfig.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });

    const router = useRouter()
    const {orgId} = router.query;

    if (!isLoading && types.length == 0) {
        getExpenseTypes(accessToken, Array.isArray(orgId) ? orgId[0] : orgId, serverSideConfig).then(types => setTypes(types));
    }
    const data = types.length === 0 ? [] : types.map(({id,code, type, multiplicator, i18n}) => {
        return {
            id: id,
            code: code,
            type: type,
            multiplicator: multiplicator,
            actions: (
                // we've added some custom button actions
                <div className='actions-right'>
                    {/* use this button to add a like kind of action */}
                    <Button color='warning' size='sm' className='btn-icon btn-link edit'>
                        <i className='fa fa-edit' />
                    </Button>{' '}
                    {/* use this button to remove the data row */}
                    <Button color='danger' size='sm' className='btn-icon btn-link remove'>
                        <i className='fa fa-times' />
                    </Button>{' '}
                </div>
            ),
        };
    });
    return (
        <GridContainer>
            {/*@ts-ignore*/}
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color='info'>
                        <h4 className={classes.cardTitleWhite}>Liste des catégories de dépenses</h4>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            tableHeaderColor='info'
                            data={data}
                            columns={[
                                {
                                    Header: 'Code',
                                    accessor: 'code',
                                    sortable: false,
                                },
                                {
                                    Header: 'Type',
                                    accessor: 'type',
                                    sortable: false,
                                },
                                {
                                    Header: 'Multiplicator',
                                    accessor: 'multiplicator',
                                    sortable: false,
                                },
                                {
                                    Header: 'Actions',
                                    accessor: 'actions',
                                    sortable: false,
                                    filterable: false,
                                },
                            ]}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

expTypes.layout = AdminLayout;

export default expTypes;
