import Link from "next/link";
import { UserInternalData, getUsers } from "./api";

export default async function Usuarios() {
    const users = await getUsers();
    const userAttributes: [ externalName: string, internalName: keyof UserInternalData ][] = [
        [ "Id", "id" ],
        [ "Nombre", "name" ],
        [ "Nombre de usuario", "username" ],
        [ "Correo electrónico", "email" ]
    ];

    return (
        <section>
            <header>
                <h1>Usuarios</h1>
                <p>Estás visualizando los usuarios actuales</p>
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            {
                                userAttributes.map(([ externalName, _ ]) => {
                                    return (
                                        <th>
                                            {externalName}
                                        </th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                users.map(user => {
                                    return (
                                        <tr key={user.id}>
                                            {
                                                userAttributes.map(([ externalName, internalName ]) => {
                                                    const data = user[internalName];
                                                    if (typeof data == "number" || typeof data == "string") {
                                                        const content = (() => {
                                                            if (internalName == "name") {
                                                                return (
                                                                    <Link href={`usuarios/${user.id}`}>
                                                                        {data}
                                                                    </Link>
                                                                );
                                                            }
                                                            return data;
                                                        })();

                                                        return (
                                                            <td>
                                                                <label title={externalName}>
                                                                    {content}
                                                                </label>
                                                            </td>
                                                        );
                                                    }
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

