import React from "react";
import {
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import { map, informationCircle, listBox } from "ionicons/icons";
import CovidDetails from "./CovidDetails/CovidDetails";
import MapView from "./Map/MapView";
import About from "./About";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact={true} path="/tabs" to="/tabs/map" />
                {/*
                  Using the render method prop cuts down the number of renders your components will have due to route changes.
                  Use the component prop when your component depends on the RouterComponentProps passed in automatically.
                */}
                <Route
                    path="/tabs/covidDetails"
                    render={() => <CovidDetails />}
                    exact={true}
                />
                <Route
                    path="/tabs/map"
                    render={() => <MapView />}
                    exact={true}
                />
                <Route
                    path="/tabs/about"
                    render={() => <About />}
                    exact={true}
                />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="map" href="/tabs/map">
                    <IonIcon icon={map} />
                    <IonLabel>Map</IonLabel>
                </IonTabButton>
                <IonTabButton tab="covidDetails" href="/tabs/covidDetails">
                    <IonIcon icon={listBox} />
                    <IonLabel>List</IonLabel>
                </IonTabButton>
                <IonTabButton tab="about" href="/tabs/about">
                    <IonIcon icon={informationCircle} />
                    <IonLabel>About</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;
