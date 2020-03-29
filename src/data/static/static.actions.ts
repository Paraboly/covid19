import { getStaticData } from "../dataApi";
import { ActionType } from "../../util/types";
import { StaticState } from "./static.state";

export const loadStaticData = () => async (dispatch: React.Dispatch<any>) => {
    dispatch(setLoading(true));
    const data = await getStaticData();
    dispatch(setData(data));
    dispatch(setLoading(false));
};

export const setLoading = (isLoading: boolean) =>
    ({
        type: "set-static-loading",
        isLoading
    } as const);

export const setData = (data: Partial<StaticState>) =>
    ({
        type: "set-static-data",
        data
    } as const);

export type UserActions =
    | ActionType<typeof setLoading>
    | ActionType<typeof setData>;
