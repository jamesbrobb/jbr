import {TagDS} from "../tag/tag.ds";
import {WordSenseDS} from "../word-sense/word-sense.ds";


export interface LessonPlanDS {

    id: string;

    title?: string;
    topic?: string;
    description?: string;

    isPublished?: boolean;
    isPublishedByUser: boolean;
    userId: string;

    course?: {
        id: string;
        title: string;
    };

    unit?: {
        id: string;
        title: string;
        order?: number;
    };

    skills?: TagDS[];
    CEFRStages?: TagDS[];
    recommendedStudyEnvironment?: TagDS[];

    duration?: number;
    objectives?: string;
    coveredRequirements?: string;

    thumbnailAssetPath?: string;

    vocabulary?: WordSenseDS[];
}

