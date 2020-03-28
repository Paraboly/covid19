import React from "react";
import {
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption
} from "@ionic/react";
import { Time } from "../Time";
import { CovidEntity } from "../../models/CovidEntity";

interface CovidCardProps {
    covidEntity: CovidEntity;
    isWatching: boolean;
    onStartWatching: (entityName: string) => void;
    onStopWatching: (entityName: string) => void;
}

const CovidCard: React.FC<CovidCardProps> = ({
    isWatching,
    onStartWatching,
    onStopWatching,
    covidEntity
}) => {
    const stopWatching = () => {
        onStopWatching(covidEntity.name);
    };

    const startWatching = () => {
        onStartWatching(covidEntity.name);
    };

    return (
        <IonItemSliding class={"covid-card"}>
            <IonItem>
                <IonLabel>
                    <h3>{covidEntity.name}</h3>
                    <p>
                        <Time date={covidEntity.lastUpdated} /> &mdash;&nbsp;
                    </p>
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                {isWatching ? (
                    <IonItemOption color="danger" onClick={stopWatching}>
                        Stop Watching
                    </IonItemOption>
                ) : (
                    <IonItemOption color="favorite" onClick={startWatching}>
                        Watch
                    </IonItemOption>
                )}
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default React.memo(CovidCard);
