import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from 'use-auth0-hooks';

export default function App() {
    const { logout, user } = useAuth();
    return (
        <>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle variant='outline-info'>
                    {user &&
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="nav-user-profile rounded-circle"
                            width="25"
                        />
                    }
                    {user && <span style={{ marginLeft : 10}}>{ user.nickname }</span>}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Header>Dropdown header</Dropdown.Header>
                    {/*todo: fix the reload issue*/}
                    <Dropdown.Item  href='/profile'>
                        <FontAwesomeIcon icon={faUser} className='mr-3' />
                            Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => logout({})}>
                        <FontAwesomeIcon icon={faSignOutAlt} className='mr-3' />Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}