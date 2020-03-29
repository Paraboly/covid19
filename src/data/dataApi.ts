import { Plugins } from "@capacitor/core";
import { CovidEntity } from "../models/CovidEntity";
import { Location } from "../models/Location";
import { ApiService } from "../services/ApiService";
import { RawCovidEntity } from "../models/RawCovidEntity";
import { NameToRawLicenseAttributionDict } from "../models/LicenseAttribution/NameToRawLicenseAttributionDict";
import _ from "lodash";
import { LicenseAttribution } from "../models/LicenseAttribution/LicenseAttribution";

const { Storage } = Plugins;

const locationsUrl = "/assets/data/locations.json";
const licenseAttribsUrl = "/assets/generated/licenseAttribs.json";

const HAS_LOGGED_IN = "hasLoggedIn";
const HAS_SEEN_TUTORIAL = "hasSeenTutorial";
const USERNAME = "username";

function processRawCovidData(rawCovidData: RawCovidEntity): CovidEntity {
    return {
        ...rawCovidData,
        province: rawCovidData.province || "",
        updatedAt: new Date(rawCovidData.updatedAt),
        coordinates: {
            latitude: Number.parseFloat(rawCovidData.coordinates.latitude),
            longitude: Number.parseFloat(rawCovidData.coordinates.longitude)
        },
        isCountry: rawCovidData.province === null,
        displayName:
            rawCovidData.province === null
                ? rawCovidData.country
                : `${rawCovidData.province}, ${rawCovidData.country}`,
        _uid:
            rawCovidData.province === null
                ? rawCovidData.country
                : rawCovidData.country + rawCovidData.province
    };
}

function processRawLicenseAttribs(
    rawLicenseAttribDict: NameToRawLicenseAttributionDict
): LicenseAttribution[] {
    return _.chain(rawLicenseAttribDict)
        .mapValues((rawLicenseAttrib, name) => {
            return { name, ...rawLicenseAttrib };
        })
        .values()
        .map(a => {
            return {
                ...a,
                repository: new URL(a.repository)
            };
        })
        .value();
}

export const getCovidData = async () => {
    const response = await Promise.all([
        fetch(locationsUrl),
        ApiService.getAllEntities()
    ]);

    const locations = (await response[0].json()) as Location[];
    const rawCovidData = response[1];

    const processedCovidData = rawCovidData.map(rawData =>
        processRawCovidData(rawData)
    );

    return {
        locations,
        covidEntities: processedCovidData
    };
};

export const getStaticData = async () => {
    const response = await Promise.all([fetch(licenseAttribsUrl)]);

    const rawLicenseAttribs = (await response[1].json()) as NameToRawLicenseAttributionDict;

    const processedLicenseAttribs = processRawLicenseAttribs(rawLicenseAttribs);

    return {
        licenseAttributions: processedLicenseAttribs
    };
};

export const getUserData = async () => {
    const response = await Promise.all([
        Storage.get({ key: HAS_LOGGED_IN }),
        Storage.get({ key: HAS_SEEN_TUTORIAL }),
        Storage.get({ key: USERNAME })
    ]);
    const isLoggedin = response[0].value === "true";
    const hasSeenTutorial = response[1].value === "true";
    const username = response[2].value || undefined;
    const data = {
        isLoggedin,
        hasSeenTutorial,
        username
    };
    return data;
};

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
    await Storage.set({
        key: HAS_LOGGED_IN,
        value: JSON.stringify(isLoggedIn)
    });
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
    await Storage.set({
        key: HAS_SEEN_TUTORIAL,
        value: JSON.stringify(hasSeenTutorial)
    });
};

export const setUsernameData = async (username?: string) => {
    if (!username) {
        await Storage.remove({ key: USERNAME });
    } else {
        await Storage.set({ key: USERNAME, value: username });
    }
};
