import { memo, useCallback, useContext, useState } from "react";
import classNames from "classnames";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
//import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './LoginForm.module.scss';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';
import { useAuthMutation } from "@/entities/User/api/userApi";
import { AuthContext } from "@/shared/lib/context/AuthContext";
import { useNavigate } from "react-router";



const LoginForm = memo(() => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [remember, setRemember] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [auth, { isLoading, error }] = useAuthMutation();

    const navigate = useNavigate();


  const onLoginClick = async (e:any) => {
    e.preventDefault();
    try {
        const data = await auth({username, password}).unwrap();
        console.log('Login successful:', data);

        setIsAuth && setIsAuth(true);

        if (remember) {
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
        }
        else {
            sessionStorage.setItem('accessToken', data.access_token);
            sessionStorage.setItem('refreshToken', data.refresh_token);
        }

        navigate("/");
        
    } catch (err) {
        console.error('Failed to login:', err);
    }
};

    const onModalButtonClick = () => {
        setModalOpen(prev => !prev);
    }

    const onChangeUsername = useCallback((value: string) => {
        setUsername(value);
    }, []);

    const onChangePassword = useCallback((value: string) => {
        setPassword(value);
    }, []);

    const onChangeRemember = useCallback(() => {
        setRemember(prev => !prev);
    }, []);

    const InputClassesUser = classNames(
        'input-m',
        'icon',
        'user'
    ).split(' ');

    const InputClassesPassword = classNames(
        'input-m',
        'icon',
        'password'
    ).split(' ');

    const CheckBoxClasses = classNames(
        'checkbox',
        'sr-only'
    ).split(' ');

    const LoginButtonClasses = classNames(
        'loginButton',
        'border-radius'
    ).split(' ');

    const AccountsListButtonClasses = classNames(
        'icon',
        'accountsButton',
    ).split(' ');


    return (
        <>
            <form action="" className={classNames(cls.LoginForm)}>
                <Button
                    classes={AccountsListButtonClasses}
                    onClick={onModalButtonClick}
                >
                    {'возможные пользователи'}
                </Button>
                {error && (
                    <Text
                        text={'Вы ввели неверный логин или пароль'}
                        classes={['error']}
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    classes={InputClassesUser}
                    placeholder={'Введите username'}
                    onChange={onChangeUsername}
                    value={username}
                    required={true}
                />
                <Input
                    type="password"
                    classes={InputClassesPassword}
                    placeholder={'Введите пароль'}
                    onChange={onChangePassword}
                    value={password}
                    required={true}
                />
                <label className={cls.inputWrapper} htmlFor="remember">
                    <Input
                        id='remember'
                        type="checkbox"
                        classes={CheckBoxClasses}
                        onChange={onChangeRemember}
                        checked={remember}
                    />
                        Запомнить меня
                </label>
                <Button
                    type={'submit'}
                    classes={LoginButtonClasses}
                    onClick={onLoginClick}
                >
                    {'Войти'}
                </Button>
            </form>



            <Modal onClose={onModalButtonClick} isOpen={modalOpen} title='возможные пользователи'>
                содержимое содержимое содержимое содержимое содержимое
            </Modal>
        </>
    );
});

export default LoginForm;
