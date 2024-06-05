import { memo, useCallback, useState} from 'react';
import classNames from 'classnames';
import { Button} from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
//import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './LoginForm.module.scss';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';



const LoginForm = memo(() => {
    //const dispatch = useAppDispatch();

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin')
    const [modalOpen, setModalOpen] = useState(false);

    const error = false; //потом из апи ошибку будем брать


    const onLoginClick = () => {
        //что произойдет после отправки формы
    }

    const onModalButtonClick = () => {
        setModalOpen(prev => !prev);
    }

    const onChangeUsername = useCallback((value: string) => {
        setUsername(value);
    }, []);

    const onChangePassword = useCallback((value: string) => {
        setPassword(value);
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
    ).split(' ');

    const AccountsListButtonClasses = classNames(
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
                <div className={cls.inputWrapper}>
                    <Input
                        id='remember'
                        type="checkbox"
                        classes={CheckBoxClasses}
                        required={true}
                    />
                    <label className={cls.noSelected} htmlFor="remember">Запомнить меня</label>
                </div>
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
