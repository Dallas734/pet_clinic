import LoginForm from '@/features/AuthByUsername/ui/LoginForm/LoginForm';
import { Link } from 'react-router-dom';

const MainPage = () => {

    return (
        <main>
            <section className='Login'>
                <LoginForm/>
                <Link to={'/main'}>просто войти</Link>
            </section>
        </main>
    )
};

export default MainPage;
