import { Location } from "./Location";
export interface EntityData {
    name: string;
    location: Location;
    date: Date;
    confirmed: number;
    recovered: number;
    deaths: number;
}
