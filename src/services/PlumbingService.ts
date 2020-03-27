export abstract class PlumbingService {
    private static readonly baseUrl = "https://api.covid19api.com/";

    private static async get(url: string) {
        return fetch(url.toString(), {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                if (
                    response["error"] === true ||
                    response["statusCode"] !== 200
                ) {
                    throw new Error(response);
                } else {
                    return response.data;
                }
            });
    }

    /**
     * Get All Data
     *
     *  Returns all data in the system. Warning: this request returns 8MB+ and takes 5+ seconds
     *
     *  Path: "/all",
     *
     *  Params: null
     */
    public static async getAllData() {
        const url = this.baseUrl + "/all";
        return this.get(url);
    }

    /**
     * Get List Of Countries
     *
     * Returns all countries and associated provinces. The country_slug variable is used for country specific data
     *
     * Path: /countries
     *
     * Params: null
     */
    public static async getListOfCountries() {
        const url = this.baseUrl + "/countries";
        return this.get(url);
    }

    /**
     * Get List Of Cases Per Country Per Province By Case Type
     *
     * Returns all cases by case type for a country. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /country/{country}/status/{status}
     *
     * Params: [
     *  "country",
     *  "status"
     * ]
     */
    public static async getCases_WithCountryWithStatus_PerProvince(
        country: string,
        status: "confirmed" | "recovered" | "deaths"
    ) {
        const url = `${this.baseUrl}/country/${country}/status/${status}`;
        return this.get(url);
    }

    /**
     * Get List Of Cases Per Country Per Province By Case Type With Live Count
     *
     * Returns all cases by case type for a country with the latest record being the live count. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /country/{country}/status/{status}/live
     *
     * Params: [
     *  "country",
     *  "status"
     * ]
     */

    public static async getCases_Live_WithCountryWithStatus_PerProvince(
        country: string,
        status: "confirmed" | "recovered" | "deaths"
    ) {
        const url = `${this.baseUrl}/country/${country}/status/${status}/live`;
        return this.get(url);
    }

    /**
     * Get List Of Cases Per Country By Case Type
     *
     * Returns all cases by case type for a country. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /total/country/{country}/status/{status}
     *
     * Params: [
     *  "country",
     *  "status"
     * ]
     */
    public static async getCases_WithCountryWithStatus_Total(
        country: string,
        status: "confirmed" | "recovered" | "deaths"
    ) {
        const url = `${this.baseUrl}/total/country/${country}/status/${status}`;
        return this.get(url);
    }

    /**
     * Get List Of Cases Per Country Per Province By Case Type From The First Recorded Case
     *
     * Returns all cases by case type for a country from the first recorded case. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /dayone/country/{country}/status/{status}
     *
     * Params: [
     *  "country",
     *  "status"
     * ]
     */
    public static async getCases_WithCountryWithStatus_PerProvince_FromDayOne(
        country: string,
        status: "confirmed" | "recovered" | "deaths"
    ) {
        const url = `${this.baseUrl}/dayone/country/${country}/status/${status}`;
        return this.get(url);
    }

    /**
     * Get List Of Cases Per Country By Case Type From The First Recorded Case
     *
     * Returns all cases by case type for a country from the first recorded case. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /total/dayone/country/{country}/status/{status}
     *
     * Params: [
     *  "country",
     *  "status"
     * ]
     */
    public static async getCases_WithCountryWithStatus_Total_FromDayOne(
        country: string,
        status: "confirmed" | "recovered" | "deaths"
    ) {
        const url = `${this.baseUrl}/total/dayone/country/${country}/status/${status}`;
        return this.get(url);
    }

    /**
     * Get List Of Cases Per Country Per Province By Case Type From The First Recorded Case With Live Count
     *
     * Returns all cases by case type for a country from the first recorded case with the latest record being the live count. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /dayone/country/{country}/status/{status}/live
     *
     * Params: [
     *  "country",
     *  "status"
     * ]
     */
    public static async getCases_Live_WithCountryWithStatus_PerProvince_FromDayOne(
        country: string,
        status: "confirmed" | "recovered" | "deaths"
    ) {
        const url = `${this.baseUrl}/dayone/country/${country}/status/${status}/live`;
        return this.get(url);
    }

    /**
     * Get Live List Of Cases Per Country Per Province By Case Type
     *
     * Returns all live cases by case type for a country. These records are pulled every 10 minutes and are ungrouped. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /live/country/{country}/status/{status}
     *
     * Params: [
     *  "country",
     *  "status"
     * ]
     */
    public static async getCases_Live_Ungrouped_WithCountryWithStatus_PerProvince(
        country: string,
        status: "confirmed" | "recovered" | "deaths"
    ) {
        const url = `${this.baseUrl}/live/country/${country}/status/${status}`;
        return this.get(url);
    }

    /**
     * Get Live List Of Cases Per Country Per Province By Case Type After A Date
     *
     * Returns all live cases by case type for a country after a given date. These records are pulled every 10 minutes and are ungrouped. Country must be the country_slug from /countries. Cases must be one of: confirmed, recovered, deaths
     *
     * Path: /live/country/{country}/status/{status}/date/{date}
     *
     * Params: [
     *  "country",
     *  "status",
     *  "date"
     * ]
     */
    public static async getCases_Live_Ungrouped_WithCountryWithStatus_PerProvince_AfterDate(
        country: string,
        status: "confirmed" | "recovered" | "deaths",
        date: Date
    ) {
        const dateIso = date.toISOString();
        const url = `${this.baseUrl}/live/country/${country}/status/${status}/date/${dateIso}`;
        return this.get(url);
    }

    /* TODO: /webhook
     * Add a webhook to be notified when new data becomes available
     * POST Request must be in JSON format with key URL and the value of the webhook. Response data is the same as returned from /summary
     * Path: /webhook
     * Params: [
     *  "URL",
     *  "webhook"
     * ]
     */

    /**
     * Summary of new and total cases per country
     *
     * A summary of new and total cases per country
     *
     * Path: /summary
     *
     * Params: null
     */
    public static async getSummary_PerCountry() {
        const url = `${this.baseUrl}/summary`;
        return this.get(url);
    }
}
