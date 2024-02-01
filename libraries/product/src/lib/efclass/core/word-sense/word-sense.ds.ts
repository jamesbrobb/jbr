
export interface WordSenseDS {
    id: string;
    constituentId: string;
    headForm: string;
    definition: string;
    type: "noun" | "adjective" | "idiom";
}
