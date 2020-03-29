import { combineReducers } from "./combineReducers";
import { covidReducer } from "./covid/covid.reducer";
import { userReducer } from "./user/user.reducer";
import { staticReducer } from "./static/static.reducer";

export const initialState: AppState = {
    covid: {
        covidEntities: [],
        watchingCovidEntityUids: [],
        locations: [],
        mapCenterId: 0,
        loading: false
    },
    user: {
        hasSeenTutorial: false,
        darkMode: false,
        isLoggedin: false,
        loading: false
    },
    static: {
        licenseAttributions: [],
        loading: false
    }
};

export const reducers = combineReducers({
    covid: covidReducer,
    user: userReducer,
    static: staticReducer
});

export type AppState = ReturnType<typeof reducers>;
