import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnv } from './redux/env/envSlice';
import OktaAuth from '@okta/okta-auth-js';
import { Security, SecureRoute } from '@okta/okta-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LoginCallbackWarpper from './pages/LoginCallbackWrapper.js';
import Loading from './components/Loading';
import Error from './components/Error';

function App() {
    const [oktaAuth, setOktaAuth] = useState(null);
    const { loading, env, error } = useSelector((state) => state.env);
    console.log('App  error:', error)
    console.log('App  env:', env)
    console.log('App  loading:', loading)
    const dispatch = useDispatch();
    const memoizedFetchEnv = useCallback(() => {
        dispatch(fetchEnv());
    }, [dispatch]);
    useEffect(() => {
        memoizedFetchEnv();
    }, [memoizedFetchEnv]);
    useEffect(() => {
        if (env?.oktaIssuer && env?.oktaClientId) {
            const _oktaAuth = new OktaAuth({
                issuer: env.oktaIssuer,
                clientId: env.oktaClientId,
                responseType: 'id_token',
                redirectUri: `${window.location.origin}/login/callback`,
                scopes: ['openid', 'profile', 'email', 'groups'],
                pkce: true,
            });
            setOktaAuth(_oktaAuth);
        }
    }, [loading, env.oktaIssuer, env.oktaClientId]);
    return loading ? (
        <Loading />
    ) : error ? (
        <Error error={error} />
    ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={() => {}}>
                <Router>
                    <Navbar />
                    <Switch>
                        <SecureRoute exact path='/' component={Home} />
                        <SecureRoute exact path='/profile' component={Profile} />
                        <Route path='/login/callback' component={LoginCallbackWarpper} />
                        <Route path='*' component={() => <h2>404 page not found!!!</h2>} />
                    </Switch>
                </Router>
            </Security>
        </div>
    );
}

export default App;
