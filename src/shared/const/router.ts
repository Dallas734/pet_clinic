export enum AppRoutes {
    LOGIN = 'login',
    MAIN = 'main',
    PETS = 'pets',
    OWNERS = 'owners',
    VETERINARIANS = 'veterinarians',
    SPECIALITIES = 'specialities',
    PET_TYPES = 'petTypes',
    USERS = 'users',
    
    NOT_FOUND = 'not_found',
}

export const getRouteLogin = () => '/';
export const getRouteMain = () => '/main';
export const getRoutePets = () => '/main/pets';
export const getRouteOwners = () => '/main/owners';
export const getRouteVeterinarians = () => '/main/veterinarians';
export const getRouteSpecialities = () => '/main/specialities';
export const getRoutePetTypes = () => '/main/petTypes';
export const getRouteUsers = () =>  '/main/users';

