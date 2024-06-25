import LoginForm from '@/features/AuthByUsername/ui/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import cls from './LoginPage.module.scss'

const MainPage = () => {

    return (
        <main>
            <section className={cls.container}>
                <h1 className='sr-only'>petclinic</h1>
                <div className={cls.login}>
                    <img width={64} height={64} className={cls.logo} src="petclinic_logo.svg" alt="petclinic logo" />
                    <h2 className={`${cls.title} h4`}>Добро пожаловать в Jmix Petclinic!</h2>
                    <LoginForm/>
                </div>
                <div className={cls.bg}></div>
            </section>
        </main>
    )
};

export default MainPage;
