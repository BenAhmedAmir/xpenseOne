import UpdateProfileForm from '../components/forms/updateProfileForm';
import {getProfile} from '../services/profileService';
import User from '../models/user';
import {plainToClass} from 'class-transformer';
import UserCard from '../components/UserCard';
import {useAuth, withLoginRequired} from 'use-auth0-hooks';
import {useState} from 'react';
import Layout from '../layouts/UserLayout';
import GridContainer from '../template/components/Grid/GridContainer';
import GridItem from '../template/components/Grid/GridItem';
import getServerRuntimeConfig from '../utils/getServerRuntimeConfig';
import {GetServerSideProps} from 'next';


export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            serverSideConfig:  getServerRuntimeConfig()
        },
    }
}
const profile = ({serverSideConfig}) => {
    const [profile, setProfile] = useState(null)
    const {isLoading, accessToken} = useAuth({
        audience: serverSideConfig.AUTH0_API_AUDIENCE,
        scope: 'openid email'
    });
    if (!isLoading && !profile) {
        getProfile(accessToken, serverSideConfig).then(user => {
            const profile = plainToClass(User, user);
            setProfile(profile);
        })
    }
    return (
        <div>
            {profile ? (
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <UserCard {...profile}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                            <UpdateProfileForm {...{profile, accessToken, config:serverSideConfig}} />
                        </GridItem>
                    </GridContainer>) :   <div>Loading your user information...</div>}
        </div>
    )
}
profile.layout = Layout;
// @ts-ignore
export default profile;
// export default withLoginRequired(profile);


