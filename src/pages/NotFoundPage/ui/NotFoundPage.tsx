import { Page } from '@/widgets/Page';
import { Link } from 'react-router-dom';


export const NotFoundPage = () => {
    return (
        <Page id={'notFoundPage'}>
            <section className='section'>
                <p>такая страница не найдена!</p>
                <Link to={'/'}>главная страница</Link>
            </section>
        </Page>
    );
};
