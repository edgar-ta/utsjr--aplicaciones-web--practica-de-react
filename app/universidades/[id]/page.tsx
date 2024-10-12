import { getUniversities } from "../api";

type PropsType = {
    params: {
        id: string
    }
};

export default async function UniversityDetails(props: PropsType) {
    const index: number = Number.parseInt(props.params.id);
    const university = (await getUniversities())[index];
    
    return (
        <section>
            <header>
                <h1>
                    {university.name}
                </h1>
            </header>

        </section>
    );
}

