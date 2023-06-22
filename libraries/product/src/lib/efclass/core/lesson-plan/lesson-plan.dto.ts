import {TagDTO} from '../tag/tag.dto';
import {WordSenseDTO} from '../word-sense/word-sense.dto';



export interface LessonPlanDTO {

    id: string;

    title?: string;
    topic?: string;
    description?: string;

    skill?: TagDTO[];

    recommendedStudyEnvironment?:  TagDTO[];

    lessonObjectives?: string;
    coveredRequirements?: string;

    revision?: string;
    state?: string;
    productionStage?: string;

    metadata?: any;
    searchable?: boolean;

    CEFRStages?: TagDTO[];
    thumbnailAssetId?: any;
    thumbnailAssetPath?: string;
    playlistItems?: any[];
    BUAttributes?: any;

    vocabulary: WordSenseDTO[];
}
