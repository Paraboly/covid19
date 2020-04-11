import STORIES from './Stories.mock';
export default abstract class StoryFactory {
    static getStory(): any {
        return STORIES[1];
    }

    static getStories(): any {
        return STORIES;
    }
}
