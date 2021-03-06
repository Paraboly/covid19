import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar,
    IonToggle
} from "@ionic/react";
import { listBox, hammer, informationCircle, map } from "ionicons/icons";
import React, { useState } from "react";
import { connect } from "../data/connect";
import { RouteComponentProps, withRouter } from "react-router";
import { setDarkMode } from "../data/user/user.actions";

const routes = {
    appPages: [
        { title: "Map", path: "/tabs/map", icon: map },
        { title: "List", path: "/tabs/covidDetails", icon: listBox },
        { title: "Info", path: "/tabs/info", icon: informationCircle }
    ]
};

interface Pages {
    title: string;
    path: string;
    icon: { ios: string; md: string };
    routerDirection?: string;
}
interface StateProps {
    darkMode: boolean;
    isAuthenticated: boolean;
}

interface DispatchProps {
    setDarkMode: typeof setDarkMode;
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {}

const Menu: React.FC<MenuProps> = ({ darkMode, history, setDarkMode }) => {
    const [disableMenu, setDisableMenu] = useState(false);

    function renderlistItems(list: Pages[]) {
        return list
            .filter(route => !!route.path)
            .map(p => (
                <IonMenuToggle key={p.title} auto-hide="false">
                    <IonItem
                        button={true}
                        routerLink={p.path}
                        routerDirection="none"
                    >
                        <IonIcon slot="start" icon={p.icon} />
                        <IonLabel>{p.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
            ));
    }

    return (
        <IonMenu type="overlay" disabled={disableMenu} contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="outer-content">
                <IonList>
                    <IonListHeader>Navigate</IonListHeader>
                    {renderlistItems(routes.appPages)}
                </IonList>
                <IonList>
                    <IonListHeader>Tutorial</IonListHeader>
                    <IonItem
                        onClick={() => {
                            setDisableMenu(true);
                            history.push("/tutorial");
                        }}
                    >
                        <IonIcon slot="start" icon={hammer} />
                        Show Tutorial
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <IonLabel>Dark Theme</IonLabel>
                        <IonToggle
                            checked={darkMode}
                            onClick={() => setDarkMode(!darkMode)}
                        />
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default connect<{}, StateProps, {}>({
    mapStateToProps: state => ({
        darkMode: state.user.darkMode,
        isAuthenticated: state.user.isLoggedin
    }),
    mapDispatchToProps: {
        setDarkMode
    },
    component: withRouter(Menu)
});
