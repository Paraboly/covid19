import { getConfData } from "../dataApi";
import { ActionType } from "../../util/types";
import { SessionsState } from "./sessions.state";

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
    dispatch(setLoading(true));
    const data = await getConfData();
    dispatch(setData(data));
    dispatch(setLoading(false));
};

export const setLoading = (isLoading: boolean) =>
    ({
        type: "set-conf-loading",
        isLoading
    } as const);

export const setData = (data: Partial<SessionsState>) =>
    ({
        type: "set-conf-data",
        data
    } as const);

export const startWatching = (entityName: string) =>
    ({
        type: "start-watching",
        entityName
    } as const);

export const stopWatching = (entityName: string) =>
    ({
        type: "stop-watching",
        entityName
    } as const);

export const setSearchText = (searchText?: string) =>
    ({
        type: "set-search-text",
        searchText
    } as const);

export type SessionsActions =
    | ActionType<typeof setLoading>
    | ActionType<typeof setData>
    | ActionType<typeof startWatching>
    | ActionType<typeof stopWatching>
    | ActionType<typeof setSearchText>;
