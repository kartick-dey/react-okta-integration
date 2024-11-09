import React, { useEffect } from 'react';
import { LoginCallback, useOktaAuth } from '@okta/okta-react';

function LoginErrorComponent({ error }) {
    return <p>Login Error: {error}</p>;
}

function LoginCallbackWarpper() {
    const { authState } = useOktaAuth();
    useEffect(() => {
        if (authState && authState?.isAuthenticated) {
            window.location.href = window.location.origin + '/';
        }
    }, [authState]);
    return <LoginCallback errorComponent={LoginErrorComponent} />;
}

export default LoginCallbackWarpper;
