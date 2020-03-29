import { RawCovidEntity } from "../models/RawCovidEntity";
export class ApiService {
    private static readonly apiUrl = "https://corona.lmao.ninja/v2/jhucsse" as const;

    private static async get(url: string) {
        return fetch(url.toString(), {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                throw new Error(
                    `API call returned ${response.status} ${response.statusText}\nHeaders: ${response.headers}\nBody: ${response.text}`
                );
            } else {
                return response.json();
            }
        });
    }

    public static async getAllEntities(): Promise<RawCovidEntity[]> {
        return ApiService.get(this.apiUrl);
    }
}
