import { getCovidData } from "../dataApi";
import { ActionType } from "../../util/types";
import { CovidState } from "./covid.state";

export const loadCovidData = () => async (dispatch: React.Dispatch<any>) => {
    dispatch(setLoading(true));
    const data = await getCovidData();
    dispatch(setData(data));
    dispatch(setLoading(false));
};

export const setLoading = (isLoading: boolean) =>
    ({
        type: "set-covid-loading",
        isLoading
    } as const);

export const setData = (data: Partial<CovidState>) =>
    ({
        type: "set-covid-data",
        data
    } as const);

export const startWatching = (covidEntityUid: string) =>
    ({
        type: "start-watching",
        covidEntityUid
    } as const);

export const stopWatching = (covidEntityUid: string) =>
    ({
        type: "stop-watching",
        covidEntityUid
    } as const);

export const setSearchText = (searchText?: string) =>
    ({
        type: "set-search-text",
        searchText
    } as const);

export type CovidActions =
    | ActionType<typeof setLoading>
    | ActionType<typeof setData>
    | ActionType<typeof startWatching>
    | ActionType<typeof stopWatching>
    | ActionType<typeof setSearchText>;
