import React from "react";
import {
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonIcon
} from "@ionic/react";
import { CovidEntity } from "../../models/CovidEntity";
import { eyeOff, eye } from "ionicons/icons";

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
                        <IonIcon
                            icon={eyeOff}
                            style={{ width: "75px", height: "25px" }}
                        />
                    </IonItemOption>
                ) : (
                    <IonItemOption color="favorite" onClick={startWatching}>
                        <IonIcon
                            icon={eye}
                            style={{ width: "75px", height: "25px" }}
                        />
                    </IonItemOption>
                )}
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default React.memo(CovidCard);
