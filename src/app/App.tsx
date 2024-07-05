import { NavBar } from 'widgets/NavBar';
import { SideBar } from 'widgets/SideBar';
import { Suspense } from 'react';
import classNames from 'classnames';
import { Router } from './providers/router';

const App = () => (
    <div className={classNames('app')}>
        <Suspense fallback="">
            <NavBar />
            <div className="content-page">
                <SideBar />
                <Router />
            </div>
        </Suspense>
    </div>
);

export default App;
