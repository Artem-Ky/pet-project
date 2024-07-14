import { Route, Routes } from 'react-router-dom';
import { memo, Suspense, useMemo } from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

export const Router = memo(() => {
    const isAuth = useSelector(getUserAuthData);

    const routers = useMemo(
        () => Object.values(routeConfig).filter((route) => {
            if (route.authOnly && !isAuth) {
                return false;
            }
            return true;
        }),
        [isAuth],
    );
    return (
        <Routes>
            {routers.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            <div className="page-wrapper">{element}</div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    );
});
