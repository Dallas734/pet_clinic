import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { Page } from '@/widgets/Page';
import { MainPage } from '@/pages/MainPage';
import { LoginPage } from '@/pages/LoginPage';


const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element} //тут потом будет проверка на необходимость авторизации для доступа к странице
            />
        );
    }, []);

    return <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/main' element={<Page/>}>
            <Route index element={<MainPage/>}/>
            {Object.values(routeConfig).slice(2).map(renderWithWrapper)}
        </Route>
    </Routes>;
};

export default memo(AppRouter);
