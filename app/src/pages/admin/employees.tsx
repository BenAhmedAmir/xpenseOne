import React, {useState} from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// layout for this page
import AdminLayout from'../../layouts/AdminLayout';
// core components
import GridItem from '../../template/components/Grid/GridItem';
import GridContainer from '../../template/components/Grid/GridContainer.js';
import ReactTable from '../../template/components/Table/ReactTable.js';
import Card from '../../template/components/Card/Card.js';
import CardHeader from '../../template/components/Card/CardHeader.js';
import CardBody from '../../template/components/Card/CardBody.js';
import Button from '../../template/components/CustomButtons/Button.js';
import {useAuth} from 'use-auth0-hooks';
import {getUsers} from '../../services/admin/userService'
import User from '../../models/user';
import { useRouter } from 'next/router'
import styles from '../../styles/card';
import getServerRuntimeConfig from '../../utils/getServerRuntimeConfig';
import { GetServerSideProps } from 'next';
// @ts-ignore
const useStyles = makeStyles(styles);

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            serverSideConfig:  getServerRuntimeConfig()
        },
    }
}
const employees = (props) => {
  const classes = useStyles();
  const {serverSideConfig} = props;
  let userList : User[] = []
  const [users, setUsers] = useState(userList);

    const {isLoading, accessToken} = useAuth({
        audience: serverSideConfig.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });

    const router = useRouter()
    const {orgId} = router.query;

    if (!isLoading && users.length == 0) {
        getUsers(accessToken, Array.isArray(orgId) ? orgId[0] : orgId, serverSideConfig).then(users => setUsers(users));
    }
  const data = users.length === 0 ? [] : users.map((user, key) => {
    return {
      id: key,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
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
            <h4 className={classes.cardTitleWhite}>Liste des employés</h4>
          </CardHeader>
          <CardBody>
              <ReactTable
                  tableHeaderColor='info'
                  data={data}
                  columns={[
                      {
                          Header: 'First Name',
                          accessor: 'firstName',
                          sortable: false,
                      },
                      {
                          Header: 'Last Name',
                          accessor: 'lastName',
                          sortable: false,
                      },
                      {
                          Header: 'Email',
                          accessor: 'email',
                          sortable: false,
                      },
                      {
                          Header: 'Phone Number',
                          accessor: 'phoneNumber',
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

employees.layout = AdminLayout;

export default employees;
