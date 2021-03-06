import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import MainTabs from "./pages/MainTabs";
import { connect } from "./data/connect";
import { AppContextProvider } from "./data/AppContext";
import { loadCovidData } from "./data/covid/covid.actions";
import {
    setIsLoggedIn,
    setUsername,
    loadUserData
} from "./data/user/user.actions";
import Tutorial from "./pages/Tutorial";
import HomeOrTutorial from "./components/HomeOrTutorial";
import { CovidEntity } from "./models/CovidEntity";
import { loadStaticData } from "./data/static/static.actions";

const App: React.FC = () => {
    return (
        <AppContextProvider>
            <IonicAppConnected />
        </AppContextProvider>
    );
};

interface StateProps {
    darkMode: boolean;
    covidEntities: CovidEntity[];
}

interface DispatchProps {
    loadCovidData: typeof loadCovidData;
    loadUserData: typeof loadUserData;
    loadStaticData: typeof loadStaticData;
    setIsLoggedIn: typeof setIsLoggedIn;
    setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<IonicAppProps> = ({
    darkMode,
    covidEntities,
    setIsLoggedIn,
    setUsername,
    loadCovidData,
    loadUserData,
    loadStaticData
}) => {
    useEffect(() => {
        loadStaticData();
        loadUserData();
        loadCovidData();
        // eslint-disable-next-line
    }, []);

    return covidEntities.length === 0 ? (
        <div>Loading...</div>
    ) : (
        <IonApp className={`${darkMode ? "dark-theme" : ""}`}>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu />
                    <IonRouterOutlet id="main">
                        <Route path="/tabs" component={MainTabs} />
                        <Route path="/tutorial" component={Tutorial} />
                        <Route
                            path="/logout"
                            render={() => {
                                setIsLoggedIn(false);
                                setUsername(undefined);
                                return <Redirect to="/tabs" />;
                            }}
                        />
                        <Route path="/" component={HomeOrTutorial} exact={true} />
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
    mapStateToProps: state => ({
        darkMode: state.user.darkMode,
        covidEntities: state.covid.covidEntities
    }),
    mapDispatchToProps: {
        loadCovidData,
        loadUserData,
        loadStaticData,
        setIsLoggedIn,
        setUsername
    },
    component: IonicApp
});
