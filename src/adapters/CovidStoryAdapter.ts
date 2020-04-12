import STORIES from "./Stories.mock";
import { Story } from "react-insta-stories/dist/interfaces";
import { CovidEntity } from "../models/CovidEntity";
import PwcMapStoryModel from "../../../pwc-map/dist/types/components/PwcMapStory/PwcMapStoryModel";

export default abstract class CovidStoryAdapter {
    // TODO: will be implemented
    static watchingEntitiesToReactStory(
        watchingEntities: CovidEntity[]
    ): [Story] {
        return STORIES as any;
    }

    // TODO: will be implemented. It should be converted to factory pattern
    static toPwcMapStory(
        covidEntity: CovidEntity,
        story: Story
    ): PwcMapStoryModel {
        return null as any;
    }
}
