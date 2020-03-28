import { CovidEntity } from "../../models/CovidEntity";
import { Location } from "../../models/Location";
export interface SessionsState {
    covidEntities: CovidEntity[];
    watchingCovidEntityNames: string[];
    locations: Location[];
    searchText?: string;
    mapCenterId?: number;
    loading?: boolean;
}
