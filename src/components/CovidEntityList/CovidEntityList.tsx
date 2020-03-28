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
    watchingCovidEntityNames: string[];
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
    watchingCovidEntityNames,
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
                            watchingCovidEntityNames.indexOf(covidEntity.name) >
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
        watchingCovidEntityNames: state.data.watchingCovidEntityNames
    }),
    mapDispatchToProps: {
        startWatching,
        stopWatching
    },
    component: CovidEntityList
});
