import React from "react";
import Stories from 'react-insta-stories';
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
//import STORIES from './Stories.mock';

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
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: state => ({
    locations: state.data.locations,
    mapCenter: selectors.mapCenter(state)
  }),
  component: MapView
});
