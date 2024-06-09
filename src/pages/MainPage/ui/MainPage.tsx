import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import cls from "./MainPage.module.scss";
const MainPage = () => {

    return (
        <section className={cls.section}>
            <img height={100} width={620} src="/logo-big.svg" alt="petclinic big logo" />
            <ThemeSwitcher/>
        </section>
    )
};

export default MainPage;
