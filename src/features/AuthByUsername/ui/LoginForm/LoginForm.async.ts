import { FC, lazy } from 'react';
//import { LoginFormProps } from './LoginForm'; //для апи

export const LoginFormAsync = lazy<FC>(
    () => import('./LoginForm'),
);
