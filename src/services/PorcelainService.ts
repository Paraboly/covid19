import { PlumbingService } from "./PlumbingService";
import { CountrySummary } from "../models/CountrySummary";
import { CountryAndProvinces } from "../models/CountryAndProvinces";
import _ from "lodash";

export abstract class PorcelainService {
    public static async GetCountryAndCityList(): Promise<
        CountryAndProvinces[]
    > {
        const countryList = await PlumbingService.getListOfCountries();
        return countryList.map((c: any) => {
            return {
                countryName: c.Country,
                hasProvinceData: c.Provinces && c.Provinces.length > 0,
                provinces: c.Provinces
            };
        });
    }

    public static async GetCountrySummaries(): Promise<CountrySummary[]> {
        const countrySummaries = await PlumbingService.getSummary_PerCountry();
        return countrySummaries.map((cs: any) => {
            return {
                countryName: cs.Country,
                newConfirmed: cs.NewConfirmed,
                totalConfirmed: cs.TotalConfirmed,
                newDeaths: cs.NewDeaths,
                totalDeaths: cs.TotalDeaths,
                newRecovered: cs.NewRecovered,
                totalRecovered: cs.TotalRecovered
            };
        });
    }

    // Do we need this?
    // public static async GetCountryDatas(): Promise<CountryData[]> {}

    public static async GetCityDatas(country: string): Promise<CityData[]> {
        const promises: Promise<rawData[]>[] = [
            PlumbingService.getCases_WithCountryWithStatus_PerProvince(
                country,
                "confirmed"
            ),
            PlumbingService.getCases_WithCountryWithStatus_PerProvince(
                country,
                "recovered"
            ),
            PlumbingService.getCases_WithCountryWithStatus_PerProvince(
                country,
                "deaths"
            )
        ];

        const results = await Promise.all(promises);
        const lastDatasOfProvincesByCaseType = results.map(caseTypeArr =>
            _.chain(caseTypeArr)
                // 1. group by province
                .groupBy(d => d.Province)
                // 2. select last element of all province groups
                .mapValues(g => _.last(g))
                // 3. extract values
                .value()
        );

        let merged: { [province: string]: rawData } = {};

        for (let i = 0; i < lastDatasOfProvincesByCaseType.length; i++) {
            const provinceMap = lastDatasOfProvincesByCaseType[i];

            for (const provinceName in provinceMap) {
                if (!provinceMap.hasOwnProperty(provinceName)) {
                    continue;
                }

                const provinceData = provinceMap[provinceName];

                if (!provinceData) {
                    continue;
                }

                merged[provinceName] = Object.assign(
                    merged[provinceName],
                    provinceData
                );
            }
        }

        const m = _.reduce(lastDatasOfProvincesByCaseType);
    }
}

interface rawData {
    Country: string;
    Province: string;
    Lat: number;
    Lon: number;
    Date: string;
    Cases: number;
    Status: "confirmed" | "deaths" | "recovered";
}
