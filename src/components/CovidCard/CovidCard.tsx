import React from "react";
import {
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption
} from "@ionic/react";
import { Time } from "../Time";

interface CovidEntity {
    name: string;
    lastUpdated: string;
}

interface CovidCardProps {
    entity: CovidEntity;
    isFavorite: boolean;
    onStartWatching: (entity: CovidEntity) => void;
    onStopWatching: (entity: CovidEntity) => void;
}

const CovidCard: React.FC<CovidCardProps> = ({
    isFavorite: isWatching,
    onStartWatching,
    onStopWatching,
    entity
}) => {
    const stopWatching = () => {
        onStopWatching(entity);
    };

    const startWatching = () => {
        onStartWatching(entity);
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
