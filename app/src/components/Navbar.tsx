import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from '../template/components/Header/Header.js';
import Button from "../template/components/CustomButtons/Button.js";
import styles from "../template/assets/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js";
import CustomDropdown from "../template/components/CustomDropdown/CustomDropdown.js";
import {useAuth} from 'use-auth0-hooks';
import  Router from 'next/router';

// @ts-ignore
const useStyles = makeStyles(styles);

const handleClick = (href) => {
    Router.push(href)
}

const navbar = () => {
    const classes = useStyles();
    const { isAuthenticated, login, user, logout, isLoading } = useAuth();
    return (
        <Header
            brand="Xpense"
            color="dark"
            leftLinks={
                <List className={classes.list}>
                    {!isLoading && isAuthenticated && (
                    <ListItem className={classes.listItem}>
                        <Button
                            className={classes.navLink}
                            onClick={() => handleClick('/admin/configurations?orgId=org:paid-active')}
                            color="transparent">
                            Corporation configurations
                        </Button>
                    </ListItem>)}
                </List>
            }
            rightLinks={
                <List className={classes.list}>
                    {!isLoading && !isAuthenticated && (
                    <ListItem className={classes.listItem}>
                        <Button
                            className={classes.navLink}
                            onClick={() => login({})}
                            color="transparent">
                            Login
                        </Button>
                    </ListItem>)}
                    {isAuthenticated && user &&
                        <ListItem className={classes.listItem}>
                            <CustomDropdown
                                left
                                caret={false}
                                hoverColor="black"
                                dropdownHeader={user.nickname}
                                buttonText={
                                        <img
                                            src={user.picture}
                                            className={classes.img}
                                            alt="profile"
                                        />
                                }
                                buttonProps={{
                                    className:
                                        classes.navLink + " " + classes.imageDropdownButton,
                                    color: "transparent"
                                }}
                                dropdownList={[
                                    {label: "Profile", onClick: () => handleClick('/profile')},
                                    {label: "Sign out", onClick: logout},
                                ]}
                            />
                        </ListItem>
                    }
                </List>
            }
        />
    );
}

export default navbar;