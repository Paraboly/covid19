import { RawCovidEntity } from "../models/RawCovidEntity";
export class ApiService {
    private static readonly apiUrl = "https://corona.lmao.ninja/v2/jhucsse" as const;

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

    public static async getAllEntities(): Promise<RawCovidEntity[]> {
        return ApiService.get(this.apiUrl);
    }
}
