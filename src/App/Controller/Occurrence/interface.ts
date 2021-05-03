export interface OccurrenceInterface {
    occurrence: {
        id?: number;
        test: {
            id: number
        };
        people_appearance: {
            age: number;
            gender: string;
            glasses: boolean;
        };
        emotion: {
            anger: number;
            contempt: number;
            disgusted: number;
            fear: number;
            joy: number;
            sadness: number;
            valence: number;
            engagement: number;
        };
        expression: {
            attention: number;
            brow_furrow: number;
            brow_raise: number;
            cheek_raise: number;
            chin_raise: number;
            dimpler: number;
            eye_closure: number;
            eye_widen: number;
            inner_brow_raise: number;
            jaw_drop: number;
            lid_tighten: number;
            lip_corner_depressor: number;
            lip_press: number;
            lip_pucker: number;
            lip_stretch: number;
            lip_suck: number;
            mouth_open: number;
            nose_wrinkle: number;
            smile: number;
            smirk: number;
            upper_lip_raise: number;
        };
        // time: string;
        // emoji?: string;
        // page: {
        //     url: string;
        //     title: string;
        // };
    }
}