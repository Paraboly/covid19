import { getPlatforms } from "@ionic/react";

export enum PLATFORM_MEDIA {
    MOBILE = "mobile",
    TABLET = "tablet",
    DESKTOP = "desktop"
}

export default abstract class PlatformMediaHelper {
    static getPlatformMedia(): PLATFORM_MEDIA {
        const platforms = getPlatforms();

        const media = platforms.includes("tablet")
            ? PLATFORM_MEDIA.TABLET
            : platforms.length === 1 && platforms.includes("desktop")
            ? PLATFORM_MEDIA.DESKTOP
            : PLATFORM_MEDIA.MOBILE;

        return media;
    }
}
