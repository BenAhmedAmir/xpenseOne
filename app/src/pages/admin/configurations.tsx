import React, {useState} from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// layout for this page
import AdminLayout from'../../layouts/AdminLayout';
// core components
import GridItem from '../../template/components/Grid/GridItem';
import GridContainer from '../../template/components/Grid/GridContainer.js';
import CustomInput from '../../template/components/CustomInput/CustomInput';
import Button from '../../template/components/CustomButtons/Button'
import Card from '../../template/components/Card/Card.js';
import CardHeader from '../../template/components/Card/CardHeader.js';
import CardBody from '../../template/components/Card/CardBody.js';
import { useRouter } from 'next/router'
import {CardFooter} from 'reactstrap';
import OrgConfiguration from '../../models/org';
import {useAuth} from 'use-auth0-hooks';
import {getOrgConfig} from '../../services/admin/orgService';
import styles from '../../styles/card';
import {GetServerSideProps} from 'next';
import getServerRuntimeConfig from '../../utils/getServerRuntimeConfig';

// @ts-ignore
const useStyles = makeStyles({...styles, ...{
  submitButton: {
    margin: '1.3125rem 18px'
  }
}});

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      serverSideConfig:  getServerRuntimeConfig()
    },
  }
}
const Configuration = ({serverSideConfig}) => {
  const classes = useStyles();
  const defaultConfig : OrgConfiguration = {
    name: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  }
  const [config, setConfig] = useState(defaultConfig);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const {isLoading, accessToken} = useAuth({
    audience: serverSideConfig.AUTH0_API_AUDIENCE,
    scope: 'openid email'
  });

  const router = useRouter()
  const {orgId} = router.query;

  if (!isLoading && !isDataLoaded) {
    getOrgConfig(accessToken, Array.isArray(orgId) ? orgId[0] : orgId, serverSideConfig).then(config => {
      setConfig(config);
      setIsDataLoaded(true);
    });
  }
  return (
    <GridContainer>
      {/*@ts-ignore*/}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='info'>
            <h4 className={classes.cardTitleWhite}>Configurations</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {/*@ts-ignore*/}
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                    labelText='Organization Name'
                    id='name'
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: config.name
                    }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              {/*@ts-ignore*/}
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText='Contact Name'
                    id='contact-name'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value:config.contact.name
                    }}
                />
              </GridItem>
              {/*@ts-ignore*/}
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText='Contact Email'
                    id='contact-email'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value:config.contact.email
                    }}
                />
              </GridItem>
              {/*@ts-ignore*/}
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText='Contact Phone Number'
                    id='contact-phone'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value:config.contact.phone
                    }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button className={classes.submitButton} color='info'>Update</Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Configuration.layout = AdminLayout;

export default Configuration;
