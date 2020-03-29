export interface CovidEntity {
    readonly country: string;
    readonly province: string;
    readonly updatedAt: Date;
    readonly stats: {
        readonly confirmed: number;
        readonly deaths: number;
        readonly recovered: number;
    };
    readonly coordinates: {
        readonly latitude: number;
        readonly longitude: number;
    };
    readonly isCountry: boolean;
    readonly displayName: string;

    /// This will be unique among all entities, whether it be a country or a province.
    readonly _uid: string;
}
