import { CovidActions } from "./covid.actions";
import { CovidState } from "./covid.state";

export const covidReducer = (
    state: CovidState,
    action: CovidActions
): CovidState => {
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
                watchingCovidEntityUids: [
                    ...state.watchingCovidEntityUids,
                    action.covidEntityUid
                ]
            };
        }
        case "stop-watching": {
            return {
                ...state,
                watchingCovidEntityUids: [
                    ...state.watchingCovidEntityUids.filter(
                        x => x !== action.covidEntityUid
                    )
                ]
            };
        }
        case "set-search-text": {
            return { ...state, searchText: action.searchText };
        }
    }
};
