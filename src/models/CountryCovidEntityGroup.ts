import { CovidEntity } from "./CovidEntity";

export interface CountryCovidEntityGroup {
    country: string;
    entities: CovidEntity[];
}
