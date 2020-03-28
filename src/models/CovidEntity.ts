export interface CovidEntity {
    country: string;
    province: string | null;
    updatedAt: Date;
    stats: {
        confirmed: number;
        deaths: number;
        recovered: number;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
    isCountry: boolean;
}
