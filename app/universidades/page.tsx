import type { UniversityVisibleData } from "./api";
import { getUniversities } from "./api";

export default async function Universidades() {
    const universities: UniversityVisibleData[] = (await getUniversities()).map((university, index) => {
        const canonicalDomain = university.domains[0];

        return {
            index,
            name: university.name,
            domain: `${canonicalDomain}`
        };
    });

    return (
        <section>
            <header>
                <h1>Universidades</h1>
                <p>Estás visualizando las universidades del país</p>
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            universities.map(university => {
                                const keys = Object.keys(university) as [keyof UniversityVisibleData];
                                return (
                                    <tr id={university.index.toString()}>
                                        {
                                            keys.map((key) => {
                                                if (key == "domain") {
                                                    const link = university[key];
                                                    return (
                                                        <td>
                                                            <a href={link} target="_blank">{link}</a>
                                                        </td>
                                                    );
                                                }
                                                if (key == "name") {
                                                    return (
                                                        <td>
                                                            <a href={`/universidades/${university.index}`}>
                                                                {university.name}
                                                            </a>
                                                        </td>
                                                    );
                                                }
                                                return (
                                                    <td>
                                                        { university[key] }
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </main>
        </section>
    );
}