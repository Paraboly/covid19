import { SessionsActions } from "./sessions.actions";
import { SessionsState } from "./sessions.state";

export const sessionsReducer = (
    state: SessionsState,
    action: SessionsActions
): SessionsState => {
    switch (action.type) {
        case "set-conf-loading": {
            return { ...state, loading: action.isLoading };
        }
        case "set-conf-data": {
            return { ...state, ...action.data };
        }
        case "add-favorite": {
            return {
                ...state,
                watchingCovidEntityNames: [
                    ...state.watchingCovidEntityNames,
                    action.entityName
                ]
            };
        }
        case "remove-favorite": {
            return {
                ...state,
                watchingCovidEntityNames: [
                    ...state.watchingCovidEntityNames.filter(
                        x => x !== action.entityName
                    )
                ]
            };
        }
        case "update-filtered-tracks": {
            // return { ...state, filteredTracks: action.filteredTracks };
            return state;
        }
        case "set-search-text": {
            return { ...state, searchText: action.searchText };
        }
    }
};
