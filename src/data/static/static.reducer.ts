import { UserActions } from "./static.actions";
import { StaticState } from "./static.state";

export function staticReducer(
    state: StaticState,
    action: UserActions
): StaticState {
    switch (action.type) {
        case "set-static-loading":
            return { ...state, loading: action.isLoading };
        case "set-static-data":
            return { ...state, ...action.data };
    }
}
