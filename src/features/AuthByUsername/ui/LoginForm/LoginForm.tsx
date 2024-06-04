import { memo, useCallback, useState} from 'react';
import classNames from 'classnames';
import { Button} from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
//import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './LoginForm.module.scss';
import { Text } from '@/shared/ui/Text';



const LoginForm = memo(() => {
    //const dispatch = useAppDispatch();

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin')

    const error = false; //потом из апи ошибку будем брать


    const onLoginClick = () => {
        //что произойдет после отправки формы
    }

    const onChangeUsername = useCallback((value: string) => {
        setUsername(value);
    }, []);

    const onChangePassword = useCallback((value: string) => {
        setPassword(value);
    }, []);

    return (
            <form className={classNames(cls.LoginForm)}>
                {error && (
                    <Text
                        text={'Вы ввели неверный логин или пароль'}
                        classes={['error']}
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={'Введите username'}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="password"
                    className={cls.input}
                    placeholder={'Введите пароль'}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    type={'submit'}
                    classes={[]}
                    onClick={onLoginClick}
                >
                    {'Войти'}
                </Button>
            </form>
    );
});

export default LoginForm;
