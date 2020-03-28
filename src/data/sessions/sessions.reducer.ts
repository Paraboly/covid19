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
        case "start-watching": {
            return {
                ...state,
                watchingCovidEntityNames: [
                    ...state.watchingCovidEntityNames,
                    action.entityName
                ]
            };
        }
        case "stop-watching": {
            return {
                ...state,
                watchingCovidEntityNames: [
                    ...state.watchingCovidEntityNames.filter(
                        x => x !== action.entityName
                    )
                ]
            };
        }
        case "set-search-text": {
            return { ...state, searchText: action.searchText };
        }
    }
};
