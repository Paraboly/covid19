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
    isFavorite: boolean;
    onStartWatching: (entityName: string) => void;
    onStopWatching: (entityName: string) => void;
}

const CovidCard: React.FC<CovidCardProps> = ({
    isFavorite: isWatching,
    onStartWatching,
    onStopWatching,
    covidEntity: entity
}) => {
    const stopWatching = () => {
        onStopWatching(entity.name);
    };

    const startWatching = () => {
        onStartWatching(entity.name);
    };

    return (
        <IonItemSliding class={"covid-card"}>
            <IonItem>
                <IonLabel>
                    <h3>{entity.name}</h3>
                    <p>
                        <Time date={entity.lastUpdated} /> &mdash;&nbsp;
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
