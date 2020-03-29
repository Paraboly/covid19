import { combineReducers } from "./combineReducers";
import { covidReducer } from "./covid/covid.reducer";
import { userReducer } from "./user/user.reducer";

export const initialState: AppState = {
    data: {
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
    }
};

export const reducers = combineReducers({
    data: covidReducer,
    user: userReducer
});

export type AppState = ReturnType<typeof reducers>;
