import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
function Navbar() {
    const { authState, oktaAuth } = useOktaAuth();
    const navStyle = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline',
        };
    };
    const handleLogout = () => {
        oktaAuth.signOut({
            postLogoutRedirectUri: window.location.origin,
        });
        return <Redirect to='/login/callback' />;
    };
    return (
        <nav>
            <NavLink style={navStyle} to='/'>
                Home
            </NavLink>
            <NavLink style={navStyle} to='/profile'>
                Profile
            </NavLink>
            {authState?.isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
}

export default Navbar;
