/* eslint-disable @typescript-eslint/no-namespace */
import React, { useRef } from "react";
import "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@paraboly/pwc-map";
import CovidStoryPanel from "../../components/CovidStoryPanel/CovidStoryPanel";

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
import "./CovidMap.scss";
import { CountryToCovidEntitiesDict } from '../../models/CountryToCovidEntitiesDict';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "pwc-map": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            "pwc-map-geojson-layer": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            "pwc-map-corona": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

interface OwnProps {

}

interface StateProps {
    watchingCovidEntityUids: string[];
    mapCenter: Location;
}

interface DispatchProps { }

interface CovidMapProps extends OwnProps, StateProps, DispatchProps { }

const CovidMap: React.FC<CovidMapProps> = ({ watchingCovidEntityUids, mapCenter }) => {
    const pwcMap = useRef<HTMLDivElement>(null);

    if (pwcMap.current) {
        startMap(pwcMap.current);
    }
    console.log(watchingCovidEntityUids);
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
                <CovidStoryPanel />
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
};

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: state => ({
        watchingCovidEntityUids: state.covid.watchingCovidEntityUids,
        mapCenter: selectors.mapCenter(state)
    }),
    component: CovidMap
});
