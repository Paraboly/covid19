import { IonList, IonListHeader } from "@ionic/react";
import React from "react";
import { connect } from "../../data/connect";
import { startWatching, stopWatching } from "../../data/covid/covid.actions";
import CovidCard from "../CovidCard/CovidCard";
import { CovidEntity } from "../../models/CovidEntity";

interface OwnProps {
    covidEntities: CovidEntity[];
    hide: boolean;
}

interface StateProps {
    watchingCovidEntityUids: string[];
}

interface DispatchProps {
    startWatching: typeof startWatching;
    stopWatching: typeof stopWatching;
}

interface CovidEntityListProps extends OwnProps, StateProps, DispatchProps {}

const CovidEntityList: React.FC<CovidEntityListProps> = ({
    startWatching,
    stopWatching,
    covidEntities,
    watchingCovidEntityUids,
    hide
}) => {
    if (covidEntities.length === 0 && !hide) {
        return (
            <IonList>
                <IonListHeader>No Entities Found</IonListHeader>
            </IonList>
        );
    }

    return (
        <IonList style={hide ? { display: "none" } : {}}>
            {covidEntities.map(
                (covidEntity: CovidEntity, entityIndex: number) => (
                    <CovidCard
                        covidEntity={covidEntity}
                        isWatching={
                            watchingCovidEntityUids.indexOf(covidEntity._uid) >
                            -1
                        }
                        onStartWatching={startWatching}
                        onStopWatching={stopWatching}
                        key={`covid-entity-${entityIndex}`}
                    />
                )
            )}
        </IonList>
    );
};

export default connect({
    mapStateToProps: state => ({
        watchingCovidEntityUids: state.data.watchingCovidEntityUids
    }),
    mapDispatchToProps: {
        startWatching,
        stopWatching
    },
    component: CovidEntityList
});
