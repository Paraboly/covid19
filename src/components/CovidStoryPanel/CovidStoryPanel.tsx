/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from "react";
import Stories from "react-insta-stories";
import { connect } from "../../data/connect";
import "./CovidStoryPanel.scss";
import StoryFactory from "./StoryFactory";

import PlatformMediaHelper, {
    PLATFORM_MEDIA
} from "../../util/platform/media-helper";


interface OwnProps { }

interface StateProps { }

interface DispatchProps { }

interface CovidStoryPanelProps extends OwnProps, StateProps, DispatchProps { }

const CovidStoryPanel: React.FC<CovidStoryPanelProps> = () => {
    const platformMedia = PlatformMediaHelper.getPlatformMedia();
    const getStoryPanelHeight = () =>
        platformMedia === PLATFORM_MEDIA.MOBILE ? 100 : 300;

    const stories = [StoryFactory.getStory()];
    return (
        <div id="map-story-panel">
            <Stories
                stories={stories}
                height={getStoryPanelHeight()}
                width={platformMedia === PLATFORM_MEDIA.MOBILE ? window.innerWidth : window.innerWidth * 0.72}
                defaultInterval={15000}
                onStoryEnd={(s: any, st: any) =>
                    console.log("story ended", s, st)
                }
                onAllStoriesEnd={(s: any, st: any) =>
                    console.log("all stories ended", s, st)
                }
                onStoryStart={(s: any, st: any) =>
                    console.log("story started", s, st)
                }
            />
        </div>
    );
};

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: state => ({
        watchingCovidEntityUids: state.covid.watchingCovidEntityUids
    }),
    component: CovidStoryPanel
});
