import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { fetchUser } from '../redux/user/userSlice';

function Profile() {
    console.log('profile component....');
    const { loading, user, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const memoizedFetchUser = useCallback(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    useEffect(() => {
        memoizedFetchUser();
    }, [memoizedFetchUser]);
    return loading ? (
        <Loading />
    ) : error ? (
        <Error error={error} />
    ) : (
        <p>
            {' '}
            User:{' '}
            {Object.entries(user).map((key, value) => {
                return (
                    <div key={key}>
                        {key}: {value}
                    </div>
                );
            })}
        </p>
    );
}

export default Profile;
