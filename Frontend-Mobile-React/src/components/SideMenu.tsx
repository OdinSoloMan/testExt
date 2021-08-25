import React, { useState } from 'react';
import { 
    IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonMenuToggle, 
    IonIcon, 
    IonLabel, 
    IonItem,
} from "@ionic/react";
import { RouteComponentProps, useLocation, withRouter } from 'react-router';
import { 
    grid, 
    newspaper, 
    basket, 
    personCircle, 
    exit, 
    information,
    hammer 
} from 'ionicons/icons'
import './SideMenu.css';

interface Page {
    title: string;
    path: string;
    icon: string;
}

const pages: Page[] = [
    { title: 'Home', path: '/', icon: grid },
    { title: 'Orders', path: '/orders', icon: newspaper },
    { title: 'Basket', path: '/basket', icon: basket },
    { title: 'Auth', path: '/auth', icon: personCircle },
    { title: 'About', path: '/about', icon: information },
    { title: 'Test', path: '/test', icon: hammer }
];

type Props = RouteComponentProps<{}>;

const SideMenu = ({ history }: Props) => {
    const [activePage, setActivePage] = useState(pages[0].title);
    const location = useLocation();

    const renderMenuItems = (): JSX.Element[] => {
        return pages.map((page: Page) => (
            <IonMenuToggle key={page.title} auto-hide="false">
                <IonItem 
                    className={location.pathname === page.path ? 'selected' : ''}
                    button
                    //color={page.title === activePage ? 'primary' : ''}
                    onClick={() => navigateToPage(page)}>
                    <IonIcon slot="start" icon={page.icon}></IonIcon>
                    <IonLabel>
                        {page.title}
                    </IonLabel>
                </IonItem>
            </IonMenuToggle>
        ));
    }

    const navigateToPage = (page: Page) => {
        history.push(page.path);
        setActivePage(page.title);
    }

    return (
        <IonMenu contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Menu
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    { renderMenuItems() }
                </IonList>
            </IonContent>
        </IonMenu>
    );
}

export default withRouter(
    SideMenu
);