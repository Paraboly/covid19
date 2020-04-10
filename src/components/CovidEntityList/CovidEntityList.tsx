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

    function sortGroupsBySeverity(
        groups: CountryToCovidEntitiesDict
    ): { country: string; entities: CovidEntity[] }[] {
        return (
            _.chain(groups)
                .mapValues((v, k) => {
                    return { country: k, entities: v };
                })
                .values()
                /** This is not the real intended behaviour. Ideally we should sort on the country total.
                 * But if the country is not selected as a favorite, the code blows up and burns in ashes.
                 * This whole sorting ordeal should be handled in selectors and it requires some data
                 * structure changed, namely:
                 * From this: { [key: string]: CovidEntities[] }
                 * To this  : { country: string, entities: CovidEntity[]}[]
                 * This allows us to do sorting on the groups with some lodash magic, as it is basically an
                 * array now.
                 * (Tarık, 2020/04/10)
                 */
                .sortBy(g => g.entities[0].stats.confirmed)
                .reverse()
                .value()
        );
    }

    function renderGroups(groups: CountryToCovidEntitiesDict) {
        const sorted = sortGroupsBySeverity(groups);

        return _.chain(sorted)
            .map(group => (
                <IonItemGroup key={`group-${group.country}`}>
                    <IonItemDivider sticky={true}>
                        <IonLabel>{group.country}</IonLabel>
                    </IonItemDivider>
                    {renderGroup(group.entities)}
                </IonItemGroup>
            ))
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
