import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import HistoryNav from '@/features/HistoryNav/ui/HistoryNav';
import { Page } from '@/widgets/Page';

const MainPage = () => {

    return (
        <Page id={'mainPage'}>
            <HistoryNav/>
            <section className='section'>
                <img height={100} width={620} src="/logo-big.svg" alt="petclinic big logo" />
               <ThemeSwitcher/>
            </section>
        </Page>
    )
};

export default MainPage;
