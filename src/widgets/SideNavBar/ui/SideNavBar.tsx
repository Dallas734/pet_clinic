import { memo, useState } from 'react';
import cls from './SideNavBar.module.scss';
import { Button } from '@/shared/ui/Button';
import classNames from 'classnames';
import { NavDropList } from '@/shared/ui/NavDropList';
import { Link } from 'react-router-dom';
import { useGetTimeZoneString } from '@/shared/lib/hooks/useTimeZone/useTimeZone';

export interface DictionaryListLinks {
    [key: string]: string;
}
export enum NavBarListName {
    Petclinic = 'Petclinic',
    MasterData = 'Master data',
    Administration = 'Administration'
}


export const SideNavBar = memo(() => {

    //а это надо будет в стор перенести когда он будет чтобы не закрывалось при октрытии другой страницы
    const [openNavLists, setOpenNavLists] = useState({
        [NavBarListName.Petclinic]: false,
        [NavBarListName.MasterData]: false,
        [NavBarListName.Administration]: false
    });

    const toggleNavDropList = (listName: NavBarListName) => {
        setOpenNavLists(prev => ({
            ...prev,
            [listName]: !prev[listName]
        }));
    };
    
    //потом все что ниже в отдельный файл перенесу

    const Petclinic: DictionaryListLinks[] = [
        { "Приемы": "visit" },
        { "Питомцы": "pets" },
        { "Владельцы": "owners" }
    ];

    const MasterData: DictionaryListLinks[] = [
        { "Ветеринары": "veterinarians" },
        { "Специальности": "specialties" },
        { "Типы питомцев": "petTypes" },
        { "Пользователи": "users" }
    ];

    const Admin: DictionaryListLinks[] = [
        { "Консоль JMX": "JMXConsole" },
        { "Забаненные": "Locks" },
        { "Ресурсные роли": "ResourceRoles" },
        { "Row-level роли": "Row-levelRoles" },
        { "Инспектор сущностей": "EntityInspector" }
    ];



    const CloseClassesButton = classNames(
        'square-m',
        'icon-center',
        'arrowLeftButton'
    ).split(' ');

    const LeaveClassesButton = classNames(
        'square-m',
        'icon-center',
        'leaveButton'
    ).split(' ');



    const PetclinicButtonClasses = classNames(
        'icon-large',
        'dropListButton',
        'petclinicButton',
        {'navDropListOpen': openNavLists.Petclinic}

    ).split(' ');

    const MasterDataButtonClasses = classNames(
        'icon-large',
        'dropListButton',
        'masterDataButton',
        {'navDropListOpen': openNavLists['Master data']}
    ).split(' ');

    const AdminButtonClasses = classNames(
        'icon-large',
        'dropListButton',
        'adminButton',
        {'navDropListOpen': openNavLists.Administration}
    ).split(' ');

    const timeZoneString = useGetTimeZoneString();

    return (
        <aside className={cls.sideNavBar}>
            <header className={cls.header}>
                <img height={20} width={20} loading='lazy' src="/logo-s.svg" alt="logo petclinic" />
                <h1 className={cls.title}>Jmix Petclinic</h1>
            </header>
            <nav className={cls.nav}>
                    <div className={cls.navList}>
                        <NavDropList isOpen={openNavLists[NavBarListName.Petclinic]} ListType={NavBarListName.Petclinic} onClick={toggleNavDropList} classes={PetclinicButtonClasses} title='Petclinic' ListLinks={Petclinic}></NavDropList>
                        <NavDropList isOpen={openNavLists[NavBarListName.MasterData]} ListType={NavBarListName.MasterData} onClick={toggleNavDropList} classes={MasterDataButtonClasses} title='Master data' ListLinks={MasterData}></NavDropList>
                        <div className={cls.themeSetting}><Link to={'/themeSetting'}>Настройки темы</Link></div>
                        <NavDropList isOpen={openNavLists[NavBarListName.Administration]} ListType={NavBarListName.Administration} onClick={toggleNavDropList} classes={AdminButtonClasses} title='Administration' ListLinks={Admin}></NavDropList>
                    </div>
                </nav>
            <footer className={cls.footer}>
                <span className={cls.timeZone}>{timeZoneString}</span>
                <div className={cls.buttons}>
                    <Button classes={CloseClassesButton}>
                        <span className="sr-only">скрыть меню навигации</span>
                    </Button>
                    <Button classes={LeaveClassesButton}>
                        <span className='sr-only'>выйти из аккаунта</span>
                    </Button>
                </div>
            </footer>
        </aside>
    );
});