import { CovidEntity } from "../../models/CovidEntity";
import { Location } from "../../models/Location";
export interface CovidState {
    covidEntities: CovidEntity[];
    watchingCovidEntityUids: string[];
    locations: Location[];
    searchText?: string;
    mapCenterId?: number;
    loading?: boolean;
}
