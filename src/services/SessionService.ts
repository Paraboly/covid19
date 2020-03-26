export abstract class SessionService {
  static async getAllCountryStats() {
    return fetch(
      "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Italy",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": "47e7e97239msh747e7fa57bdedd6p1cc142jsndf32fc618f6a"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response["error"] === true || response["statusCode"] !== 200) {
          throw new Error(response);
        } else {
          return response.data;
        }
      });
  }
}
