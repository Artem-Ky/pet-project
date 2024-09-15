import { Suspense, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
    BrowserView,
    isMobile,
    MobileView,
    isBrowser,
} from 'react-device-detect';
import { NavBar } from '@/widgets/NavBar';
import { SideBar } from '@/widgets/SideBar';
import { getUserInited, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Router } from './providers/router';
import { MobileNavigate } from '@/widgets/MobileNavigate';

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
                    <BrowserView>
                        <SideBar />
                    </BrowserView>
                    <div className={`content ${isMobile ? 'mobile' : ''}`}>
                        {isBrowser && <NavBar />}
                        {userInited && <Router />}
                        <MobileView>
                            <MobileNavigate />
                        </MobileView>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default App;
