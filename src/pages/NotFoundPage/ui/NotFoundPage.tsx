import { Link } from 'react-router-dom';


export const NotFoundPage = () => {
    return (
        <section className='section'>
        <p>такая страница не найдена!</p>
        <Link to={'/main'}>главная страница</Link>
    </section>
    );
};
