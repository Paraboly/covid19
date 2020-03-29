export interface RawCovidEntity {
    country: string;
    province: string | null;
    updatedAt: string;
    stats: {
        confirmed: number;
        deaths: number;
        recovered: number;
    };
    coordinates: {
        latitude: string;
        longitude: string;
    };
}
