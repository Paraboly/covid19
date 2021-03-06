import { createSelector } from "reselect";
import { AppState } from "./state";
import _ from "lodash";
import { CountryToCovidEntitiesDict } from "../models/CountryToCovidEntitiesDict";

const getEntities = (state: AppState) => state.covid.covidEntities;
const getWatchingCovidEntityUids = (state: AppState) =>
    state.covid.watchingCovidEntityUids;
const getSearchText = (state: AppState) => state.covid.searchText;
export const getIsLoading = (state: AppState) => state.covid.loading || false;

export const getFilteredEntities = createSelector(getEntities, x => x);

export const getSearchedEntities = createSelector(
    getFilteredEntities,
    getSearchText,
    (entities, searchText) => {
        if (!searchText) {
            return entities;
        }
        return entities.filter(entity => {
            const countryNameMatches =
                entity.country.toLowerCase().indexOf(searchText.toLowerCase()) >
                -1;

            return entity.isCountry
                ? countryNameMatches
                : countryNameMatches ||
                      entity.province
                          .toLowerCase()
                          .indexOf(searchText.toLowerCase()) > -1;
        });
    }
);

export const getCovidEntities = createSelector(getSearchedEntities, x => x);

export const getWatchingCovidEntities = createSelector(
    getSearchedEntities,
    getWatchingCovidEntityUids,
    (entities, watchingCovidEntityUids) =>
        entities.filter(x => watchingCovidEntityUids.indexOf(x._uid) > -1)
);

export const getCovidEntititesGroupedByCountry = createSelector(
    getCovidEntities,
    entities =>
        _.groupBy(entities, e => e.country) as CountryToCovidEntitiesDict
);

export const getWatchingCovidEntitiesGroupedByCountry = createSelector(
    getWatchingCovidEntities,
    entities =>
        _.groupBy(entities, e => e.country) as CountryToCovidEntitiesDict
);

export const mapCenter = (state: AppState) => {
    const item = state.covid.locations.find(
        l => l.id === state.covid.mapCenterId
    );
    if (item == null) {
        return {
            id: 1,
            name: "Map Center",
            lat: 43.071584,
            lng: -89.38012
        };
    }
    return item;
};

export const licenseAttributions = (state: AppState) => {
    return state.static.licenseAttributions;
};
