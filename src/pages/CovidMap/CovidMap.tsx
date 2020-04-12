/* eslint-disable @typescript-eslint/no-namespace */
import React, { useRef } from "react";
import "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CovidStoryPanel from "../../components/CovidStoryPanel/CovidStoryPanel";

import {
    IonContent,
    IonPage
} from "@ionic/react";

import { connect } from "../../data/connect";
import "./CovidMap.scss";

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
            "pwc-map-story": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

interface OwnProps { }

interface StateProps { }

interface DispatchProps { }

interface CovidMapProps extends OwnProps, StateProps, DispatchProps { }

const CovidMap: React.FC<CovidMapProps> = ({
}) => {
    const pwcMap = useRef<HTMLDivElement>(null);

    if (pwcMap.current) {
        startMap(pwcMap.current);
    }
    return (
        <IonPage id="map-view">
            <IonContent class="map-page">
                <CovidStoryPanel />
                <pwc-map ref={pwcMap}>
                    <pwc-map-geojson-layer />
                    <pwc-map-story />
                </pwc-map>
            </IonContent>
        </IonPage>
    );
};

const startMap = (pwcMap: HTMLElement) => {
    pwcMap.classList.add("show-map");
};

export default connect<OwnProps, StateProps, DispatchProps>({
    component: CovidMap
});
