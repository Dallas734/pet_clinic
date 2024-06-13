import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OwnersPage } from '@/pages/OwnerPage';
import PetsPage from '@/pages/PetPage/ui/PetsPage';
import { PetTypesPage } from '@/pages/PetTypesPage';
import { SpecialitiesPage } from '@/pages/SpecialitiesPage';
import { UsersPage } from '@/pages/UsersPage';
import { VeterinariansPage } from '@/pages/VeterinariansPage';
import { VisitPage } from '@/pages/VisitPage';
import {
    AppRoutes,
    getRouteLogin,
    getRouteMain,
    getRouteOwners,
    getRoutePetTypes,
    getRoutePets,
    getRouteSpecialities,
    getRouteUsers,
    getRouteVeterinarians,
    getRouteVisit
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
    [AppRoutes.PET_TYPES]: {
        path: getRoutePetTypes(),
        element: <PetTypesPage />
    },
    [AppRoutes.USERS]: {
        path: getRouteUsers(),
        element: <UsersPage />
    },
    [AppRoutes.VISIT]: {
        path: getRouteVisit(),
        element: <VisitPage />
    },



    //эта странца всегда должна быть последней!
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
