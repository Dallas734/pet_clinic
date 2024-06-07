import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import HistoryNav from '@/features/HistoryNav/ui/HistoryNav';
import { Page } from '@/widgets/Page';
import { Link } from 'react-router-dom';

const MainPage = () => {

    return (
        <Page id={'mainPage'}>
            <HistoryNav/>
            <section className='section'>
               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis eaque ducimus laborum quibusdam exercitationem quos? Officia tenetur, quia perferendis molestias aspernatur eaque cum nemo earum optio qui, dolor rem cupiditate.</p>
               <Link to={'/test'}>другая страница</Link>

               <ThemeSwitcher/>
            </section>
        </Page>
    )
};

export default MainPage;
