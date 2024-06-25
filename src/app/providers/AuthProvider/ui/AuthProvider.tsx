import { ReactNode, useMemo, useState } from 'react';
import { AuthContext } from '@/shared/lib/context/AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    let auth = false;

    if(accessToken && refreshToken) {
        auth = true;
    }

    const [isAuth, setIsAuth] = useState<boolean>(auth);



    const defaultProps = useMemo(
        () => ({
            isAuth,
            setIsAuth,
        }),
        [isAuth],
    );

    return (
        <AuthContext.Provider value={defaultProps}>
            {children}
        </AuthContext.Provider>
    );
};
