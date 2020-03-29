import React from "react";
import {
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption
} from "@ionic/react";
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
        onStopWatching(covidEntity._uid);
    };

    const startWatching = () => {
        onStartWatching(covidEntity._uid);
    };

    return (
        <IonItemSliding class={"covid-card"}>
            <IonItem lines={"inset"}>
                <IonLabel>
                    <h3>{covidEntity.displayName}</h3>
                    <p
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            justifyContent: "space-between"
                        }}
                    >
                        <span
                            style={{
                                color: "black"
                            }}
                        >
                            {covidEntity.stats.confirmed}
                        </span>
                        <span
                            style={{
                                color: "red"
                            }}
                        >
                            {covidEntity.stats.deaths}
                        </span>
                        <span
                            style={{
                                color: "blue"
                            }}
                        >
                            {covidEntity.stats.recovered}
                        </span>
                    </p>
                    <p>Updated: {covidEntity.updatedAt.toString()}</p>
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
