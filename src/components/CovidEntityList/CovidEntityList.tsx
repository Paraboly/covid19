import {
    IonList,
    IonListHeader,
    IonItemGroup,
    IonItemDivider,
    IonLabel
} from "@ionic/react";
import React from "react";
import { connect } from "../../data/connect";
import { startWatching, stopWatching } from "../../data/covid/covid.actions";
import CovidCard from "../CovidCard/CovidCard";
import { CovidEntity } from "../../models/CovidEntity";
import { CountryToCovidEntitiesDict } from "../../models/CountryToCovidEntitiesDict";
import _ from "lodash";
import { group } from "console";

interface OwnProps {
    covidEntityGroups: CountryToCovidEntitiesDict;
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
    covidEntityGroups,
    watchingCovidEntityUids,
    hide
}) => {
    if (Object.keys(covidEntityGroups).length === 0 && !hide) {
        return (
            <IonList>
                <IonListHeader>No Entities Found</IonListHeader>
            </IonList>
        );
    }

    function renderGroups(groups: CountryToCovidEntitiesDict) {
        return _.chain(covidEntityGroups)
            .mapValues((covidEntities, country) => (
                <IonItemGroup key={`group-${country}`}>
                    <IonItemDivider sticky={true}>
                        <IonLabel>{country}</IonLabel>
                    </IonItemDivider>
                    {renderGroup(covidEntities)}
                </IonItemGroup>
            ))
            .values()
            .value();
    }

    function renderGroup(group: CovidEntity[]) {
        return group.map((covidEntity: CovidEntity, entityIndex: number) => (
            <CovidCard
                covidEntity={covidEntity}
                isWatching={
                    watchingCovidEntityUids.indexOf(covidEntity._uid) > -1
                }
                onStartWatching={startWatching}
                onStopWatching={stopWatching}
                key={`covid-entity-${entityIndex}`}
            />
        ));
    }

    return (
        <IonList style={hide ? { display: "none" } : {}}>
            {renderGroups(covidEntityGroups)}
        </IonList>
    );
};

export default connect({
    mapStateToProps: state => ({
        watchingCovidEntityUids: state.covid.watchingCovidEntityUids
    }),
    mapDispatchToProps: {
        startWatching,
        stopWatching
    },
    component: CovidEntityList
});
