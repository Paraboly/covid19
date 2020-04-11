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
import CovidMap from "./CovidMap/CovidMap";
import Info from "./Info";
import Acknowledgements from "./Acknowledgements/Acknowledgements";

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact={true} path="/tabs" to="/tabs/covidMap" />
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
                    path="/tabs/covidMap"
                    render={() => <CovidMap />}
                    exact={true}
                />
                <Route path="/tabs/info" render={() => <Info />} exact={true} />
                <Route
                    path="/tabs/info/acknowledgements"
                    component={Acknowledgements}
                />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="map" href="/tabs/covidMap">
                    <IonIcon icon={map} />
                    <IonLabel>Map</IonLabel>
                </IonTabButton>
                <IonTabButton tab="covidDetails" href="/tabs/covidDetails">
                    <IonIcon icon={listBox} />
                    <IonLabel>List</IonLabel>
                </IonTabButton>
                <IonTabButton tab="info" href="/tabs/info">
                    <IonIcon icon={informationCircle} />
                    <IonLabel>Info</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;
