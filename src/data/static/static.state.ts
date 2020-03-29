import { Location } from "../../models/Location";
import { LicenseAttribution } from "../../models/LicenseAttribution/LicenseAttribution";
export interface StaticState {
    licenseAttributions: LicenseAttribution[];
    loading?: boolean;
}
