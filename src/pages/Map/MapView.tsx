/* eslint-disable @typescript-eslint/no-namespace */
import React, { useRef } from "react";
import Stories from 'react-insta-stories';
import "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@paraboly/pwc-map";

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonPage
} from "@ionic/react";
import { Location } from "../../models/Location";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import "./MapView.scss";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pwc-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'pwc-map-geojson-layer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'pwc-map-corona': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const STORIES: any = [{
  header: {
    heading: "Turkey",
    subheading: "Posted 5h ago",
    profileImage: "https://picsum.photos/1000/1000"
  },
  content: ""
}, {
  header: {
    heading: "Italy",
    subheading: "Posted 2h ago",
    profileImage: "https://picsum.photos/1000/1000"
  },
  content: ""
}];

interface OwnProps { }

interface StateProps {
  locations: Location[];
  mapCenter: Location;
}

interface DispatchProps { }

interface MapViewProps extends OwnProps, StateProps, DispatchProps { }

const MapView: React.FC<MapViewProps> = ({ locations, mapCenter }) => {
  const pwcMap = useRef<HTMLDivElement>(null);

  if (pwcMap.current) {
    startMap(pwcMap.current);
  }

  return (
    <IonPage id="map-view">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="map-page">
        <div className="story-panel">
          <Stories
            stories={STORIES}
            defaultInterval={20000}
            loop={true}
          />
        </div>
        <pwc-map ref={pwcMap}>
          <pwc-map-geojson-layer />
          <pwc-map-corona />
        </pwc-map>
      </IonContent>
    </IonPage>
  );
};


const startMap = (pwcMap: HTMLElement) => {
  pwcMap.classList.add("show-map");
  console.log("MapStarted: ", pwcMap);
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: state => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),
  component: MapView
});
