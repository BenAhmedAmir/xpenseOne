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
import Role from '../../models/role';
import {getRoles} from '../../services/admin/roleService';
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
const roles = ({serverSideConfig}) => {
  const classes = useStyles();
    let rolesList : Role[] = []
    const [roles, setRoles] = useState(rolesList);
    const [dataIsLoaded, setDataIsLoaded] = useState(false)
    const {isLoading, accessToken} = useAuth({
        audience: serverSideConfig.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });

    if (!isLoading && !dataIsLoaded) {
        getRoles(accessToken, serverSideConfig).then(roles => { setRoles(roles); setDataIsLoaded(true);});
    }
    const data = roles.length === 0 ? [] : roles.map(({id,name, description}) => {
        return {
            id: id,
            name: name,
            description: description
        };
    });
    return (
        <GridContainer>
            {/*@ts-ignore*/}
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color='info'>
                        <h4 className={classes.cardTitleWhite}>Liste des rôles</h4>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            tableHeaderColor='info'
                            data={data}
                            columns={[
                                {
                                    Header: 'Name',
                                    accessor: 'name',
                                    sortable: false,
                                },
                                {
                                    Header: 'Description',
                                    accessor: 'description',
                                    sortable: false,
                                }
                            ]}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

roles.layout = AdminLayout;

export default roles;
