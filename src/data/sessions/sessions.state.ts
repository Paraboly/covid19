import { Location } from "../../models/Location";
import { Speaker } from "../../models/Speaker";
import { CovidEntity } from "../../models/CovidEntity";
export interface SessionsState {
    covidEntities: CovidEntity[];
    speakers: Speaker[];
    watchingCovidEntityNames: string[];
    // filteredTracks: string[];
    locations: Location[];
    searchText?: string;
    mapCenterId?: number;
    loading?: boolean;
    allTracks: string[];
}
