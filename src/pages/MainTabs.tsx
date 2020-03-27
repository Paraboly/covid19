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
import LatestNewsPage from "./LatestNewsPage";
import SpeakerList from "./SpeakerList";
import SpeakerDetail from "./SpeakerDetail";
import SessionDetail from "./SessionDetail";
import MapView from "./Map/MapView";
import About from "./About";

interface MainTabsProps { }

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
          path="/tabs/latestNews"
          render={() => <LatestNewsPage />}
          exact={true}
        />
        <Route
          path="/tabs/speakers"
          render={() => <SpeakerList />}
          exact={true}
        />
        <Route
          path="/tabs/speakers/:id"
          component={SpeakerDetail}
          exact={true}
        />
        <Route path="/tabs/latestNews/:id" component={SessionDetail} />
        <Route
          path="/tabs/speakers/sessions/:id"
          component={SessionDetail}
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
        <IonTabButton tab="latestNews" href="/tabs/latestNews">
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
