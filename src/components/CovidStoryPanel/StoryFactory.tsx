import React from "react";
import STORIES from './Stories.mock';
const image = {
    display: "block",
    maxWidth: "100%",
    borderRadius: 4
};

const code = {
    background: "#eee",
    padding: "5px 10px",
    borderRadius: "4px",
    color: "#333"
};

const contentStyle = {
    background: "salmon",
    width: "100%",
    padding: 20,
    color: "white"
};

export default abstract class StoryFactory {
    static getStory(): any {
        return (
            <div
                style={{
                    ...contentStyle,
                    background: "Aquamarine",
                    color: "#16161d"
                }}
            >
                <h1>You get the control of the story.</h1>
                <p>
                    Render your custom JSX by passing just a{" "}
                    <code style={{ fontStyle: "italic" }}>content</code>{" "}
                    property inside your story object.
                </p>
                <p>
                    You get a{" "}
                    <code style={{ fontStyle: "italic" }}>action</code> prop as
                    an input to your content function, that can be used to play
                    or pause the story.
                </p>
                <h4>
                    Excited to launch v2!! Expect it around October endish.
                    Cheers! 🎉
                </h4>
                <p>react-insta-stories v2 coming soon.</p>
                <p>And so is the React Native version 💫</p>
            </div>
        );
    }

    static getStories(): any {
        return STORIES;
    }
}
