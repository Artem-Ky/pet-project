import { Suspense, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { NavBar } from '@/widgets/NavBar';
import { SideBar } from '@/widgets/SideBar';
import { getUserInited, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Router } from './providers/router';

const App = () => {
    const dispatch = useAppDispatch();
    const userInited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app')}>
            <Suspense fallback="">
                <div className="content-page">
                    <SideBar />
                    <div className="content">
                        <NavBar />
                        { userInited && <Router /> }
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default App;
