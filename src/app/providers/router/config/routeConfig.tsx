import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OwnersPage } from '@/pages/OwnerPage';
import PetsPage from '@/pages/PetPage/ui/PetsPage';
import { SpecialitiesPage } from '@/pages/SpecialitiesPage';
import { VeterinariansPage } from '@/pages/VeterinariansPage';
import {
    AppRoutes,
    getRouteLogin,
    getRouteMain,
    getRouteOwners,
    getRoutePets,
    getRouteSpecialities,
    getRouteVeterinarians
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage/>,
    },
    //main и login всегда должны быть первыми!
    [AppRoutes.PETS]: {
        path: getRoutePets(),
        element: <PetsPage />
    },
    [AppRoutes.OWNERS]: {
        path: getRouteOwners(),
        element: <OwnersPage/>
    },
    [AppRoutes.VETERINARIANS]: {
        path: getRouteVeterinarians(),
        element: <VeterinariansPage />
    },
    [AppRoutes.SPECIALITIES]: {
        path: getRouteSpecialities(),
        element: <SpecialitiesPage />
    },


    //эта странца всегда должна быть последней!
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
