import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button } from '@/shared/ui/Button';
import { Page } from '@/widgets/Page';
import { Link } from 'react-router-dom';

const MainPage = () => {
    const {toggleTheme} = useTheme();

    return (
        <Page id={'mainPage'}>
            <section className='section'>
               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis eaque ducimus laborum quibusdam exercitationem quos? Officia tenetur, quia perferendis molestias aspernatur eaque cum nemo earum optio qui, dolor rem cupiditate.</p>
               <Button onClick={toggleTheme}>
                    тык
               </Button>
               <Link to={'/test'}>другая страница</Link>
            </section>
        </Page>
    )
};

export default MainPage;
