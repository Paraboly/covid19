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
    startWatching: addFavorite,
    stopWatching: removeFavorite,
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
                        isFavorite={
                            watchingCovidEntityNames.indexOf(covidEntity.name) >
                            -1
                        }
                        onStartWatching={addFavorite}
                        onStopWatching={removeFavorite}
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
        addFavorite: startWatching,
        removeFavorite: stopWatching
    },
    component: CovidEntityList
});
