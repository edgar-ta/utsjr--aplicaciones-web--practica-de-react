import axios from "axios";

type AddressType = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
};

type CompanyType<K> = {
    name: string,
    catchPhrase: string,
    bs: K
};

export type UserData<K> = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: AddressType,
    phone: string,
    website: string,
    company: CompanyType<K>
};

export type UserApiPayload = UserData<string>;

export type CompanyInternalData = CompanyType<string[]>;
export type UserInternalData = UserData<string[]>;

export async function getUsers(): Promise<UserInternalData[]> {
    const endPoint = "https://jsonplaceholder.typicode.com/users";
    return axios
        .get(endPoint)
        .then(response => response.data)
        .then((data: UserApiPayload[]) => {
            return data.map(value => ({
                ...value,
                company: {
                    ...value.company,
                    bs: value.company.bs.split(" ")
                }
            }));
        })
    ;
}
