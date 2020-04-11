/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from "react";
import Stories from "react-insta-stories";
import { connect } from "../../data/connect";
import "./CovidStoryPanel.scss";
import StoryFactory from "./StoryFactory";

interface OwnProps {
}

interface StateProps {
}

interface DispatchProps { }

interface CovidStoryPanelProps extends OwnProps, StateProps, DispatchProps { }

const CovidStoryPanel: React.FC<CovidStoryPanelProps> = () => {
    const stories = StoryFactory.getStories();

    return (
        <div id="map-story-panel">
            <Stories
                stories={stories}
                onStoryEnd={(s: any, st: any) => console.log("story ended", s, st)}
                onAllStoriesEnd={(s: any, st: any) =>
                    console.log("all stories ended", s, st)
                }
                onStoryStart={(s: any, st: any) => console.log("story started", s, st)}
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
