/*
 * API says it wants the Country Slug, but it returns incorrect results on it.
 * On the contrary, Country Name returns the correct results.
 * Therefore, I omitted it all-together.
 */
export interface CountryAndProvinces {
    countryName: string;
    hasProvinceData: boolean;
    provinceNames: string[];
}
