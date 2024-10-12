import axios from "axios";

export type UniversityApiPayload = {
    alpha_two_code: "MX",
    country: "Mexico",
    domains: string[],
    "state-province": string | null,
    web_pages: string[],
    name: string
};

export type UniversityVisibleData = {
    index: number,
    name: string,
    domain: string
};

export async function getUniversities(): Promise<UniversityApiPayload[]> {
    const endPoint = "http://universities.hipolabs.com/search?country=Mexico";
    return axios
        .get(endPoint)
        .then(response => response.data)
        ;
}

