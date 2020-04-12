/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from "react";
import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { connect } from "../../data/connect";
import "./CovidStoryPanel.scss";
import * as selectors from "../../data/selectors";
import { CountryCovidEntityGroup } from "../../models/CountryCovidEntityGroup";
import CovidStoryAdapter from "../../adapters/CovidStoryAdapter";

import PlatformMediaHelper, {
    PLATFORM_MEDIA
} from "../../util/platform/media-helper";

interface OwnProps { }

interface StateProps {
    watchingCovidEntityUids: string[];
    watchingCovidEntitiesGroupedByCountry: CountryCovidEntityGroup[];
}

interface DispatchProps { }

interface CovidStoryPanelProps extends OwnProps, StateProps, DispatchProps { }

const getStoryPanelHeight = (platformMedia: PLATFORM_MEDIA) =>
    platformMedia === PLATFORM_MEDIA.MOBILE ? 100 : 300;

const renderNoStory = () => (
    <div id="no-story">Please select story from list</div>
);

const CovidStoryPanel: React.FC<CovidStoryPanelProps> = ({
    watchingCovidEntityUids,
    watchingCovidEntitiesGroupedByCountry
}) => {
    const platformMedia = PlatformMediaHelper.getPlatformMedia();

    const noStory = watchingCovidEntityUids.length === 0;

    const watchingEntities = watchingCovidEntitiesGroupedByCountry
        .map(country => country.entities)
        .flat()
        .filter(entity => watchingCovidEntityUids.includes(entity._uid));

    let currentCovidEntity = watchingEntities[0];

    const stories = CovidStoryAdapter.watchingEntitiesToReactStory(
        watchingEntities
    );

    const onStoryStart = (storyIndex: number, story: Story) => {
        currentCovidEntity = watchingEntities[storyIndex];
        const pwcMapStoryInstance = CovidStoryAdapter.toPwcMapStory(
            currentCovidEntity,
            story
        );
        console.log(pwcMapStoryInstance);
        // TODO: Call PwcMapStory.startStory(pwcMapStoryInstance); to start animation
    };

    const renderStoryPanel = (
        stories: [Story],
        platformMedia: PLATFORM_MEDIA
    ) => (
            <Stories
                stories={stories}
                height={getStoryPanelHeight(platformMedia)}
                width={
                    platformMedia === PLATFORM_MEDIA.MOBILE
                        ? window.innerWidth
                        : window.innerWidth * 0.72
                }
                defaultInterval={15000}
                onStoryStart={onStoryStart}
            />
        );

    return (
        <div id="map-story-panel">
            {noStory
                ? renderNoStory()
                : renderStoryPanel(stories, platformMedia)}
        </div>
    );
};

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: state => ({
        watchingCovidEntityUids: state.covid.watchingCovidEntityUids,
        watchingCovidEntitiesGroupedByCountry: selectors.getWatchingCovidEntitiesGroupedByCountry(
            state
        )
    }),
    component: CovidStoryPanel
});
