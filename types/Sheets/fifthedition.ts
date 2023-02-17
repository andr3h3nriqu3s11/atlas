export type attribute = {
	name: string,
    value: number
    proficiency: boolean
	skills: [{
        name: string,
        value: number,
        proficiency: boolean
    }]
}

export type specialFeature = {
    dmg_res: {
        section_name: string;
        values: string[];
    };
    dmg_im: {
        section_name: string;
        values: string[];
    };
    con_im: {
        section_name: string;
        values: string[];
    };
    senses: {
        section_name: string;
        values: string[];
    };
    lang: {
        section_name: string;
        values: string[];
    };
    spec_feat: {
        section_name: string;
        values: {
            heading: string;
            content: string;
        }[];
    };
    Background: {
        section_name: string;
        values: ({
            heading: string;
            content?: undefined;
        } | {
            content: string[];
            heading?: undefined;
        })[];
    };
}
