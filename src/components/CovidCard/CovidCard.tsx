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
import relativeDate from "relative-date";

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
                            Cases: {covidEntity.stats.confirmed}
                        </span>
                        <span
                            style={{
                                color: "red"
                            }}
                        >
                            Deaths: {covidEntity.stats.deaths}
                        </span>
                        <span
                            style={{
                                color: "blue"
                            }}
                        >
                            Recovered: {covidEntity.stats.recovered}
                        </span>
                    </p>
                    {covidEntity.isPseudo ? (
                        <p>
                            This is a sum of province data. May be inaccurate.
                        </p>
                    ) : (
                        <p>Updated: {relativeDate(covidEntity.updatedAt)}</p>
                    )}
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
