export interface InfoMessage {
    country: string;
    cases: Case;
    deaths: Deaths;
    day: string;
    time: string;
}

export class Case {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    total: number;
}

export class Deaths {
    new: string;
    total: number;
}