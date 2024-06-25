import { Link } from 'react-router-dom';


export const NotFoundPage = () => {
    return (
        <section className='section'>
        <p>такая страница не найдена!</p>
        <Link to={'/'}>главная страница</Link>
    </section>
    );
};
