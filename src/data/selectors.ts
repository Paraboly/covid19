import { createSelector } from "reselect";
import { AppState } from "./state";

const getEntities = (state: AppState) => state.data.covidEntities;
const getWatchingEntityNames = (state: AppState) =>
    state.data.watchingCovidEntityNames;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredEntities = createSelector(getEntities, x => x);

export const getSearchedEntities = createSelector(
    getFilteredEntities,
    getSearchText,
    (entities, searchText) => {
        if (!searchText) {
            return entities;
        }
        return entities.filter(
            entity =>
                entity.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        );
    }
);

export const getCovidEntities = createSelector(getSearchedEntities, x => x);

export const getWatchingCovidEntities = createSelector(
    getSearchedEntities,
    getWatchingEntityNames,
    (entities, watchingEntityNames) =>
        entities.filter(x => watchingEntityNames.indexOf(x.name) > -1)
);

export const mapCenter = (state: AppState) => {
    const item = state.data.locations.find(
        l => l.id === state.data.mapCenterId
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
