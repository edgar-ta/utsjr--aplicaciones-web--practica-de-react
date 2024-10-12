import { UserInternalData, getUsers } from "../api";
import { CompanyInternalData } from "../api";

type PropsType = {
    params: {
        id: string
    }
};

function LabeledContent(props: { label: string, children: React.ReactNode }) {
    return (
        <div className="
        flex
        flex-col
        items-center
        relative
        group
        ">
            <label 
            className="
            font-mono
            text-xs
            top-full
            absolute
            transition-all
            duration-200
            text-transparent
            group-hover:text-black
            w-max
            ">
                { props.label }
            </label>
            <div>
                { props.children }
            </div>
        </div>
    );
}

function TextTag(props: { text: string, key?: number }) {
    return (
        <div key={props.key} className="
        inline-block
        h-fit
        cursor-pointer 
        px-4 
        py-1 
        border 
        border-black
        bg-white
        text-black

        transition-all
        hover:text-white
        hover:bg-black
        ">
            <span className="m-0 p-0">
                {props.text}
            </span>
        </div>
    );
}

function CompanyDetails(props: { company: CompanyInternalData }) {
    return (
        <section className="
        p-8
        ">
            <header>
                <h1>
                    {props.company.name}
                </h1>
            </header>
            <main>
                <p className="italic">
                    {props.company.catchPhrase}
                </p>
                <div className="flex flex-wrap gap-3">
                    {
                        props.company.bs.map((text, index) => <TextTag text={text} key={index}/>)
                    }
                </div>
            </main>
        </section>
    );
}

function twoDigitDecimal(numberRepresentation: string): string {
    const numberValue = Number.parseFloat(numberRepresentation);
    return numberValue.toFixed(2);
}

function UserDetails(props: { user: UserInternalData, className?: string }) {
    const { user, className } = props;
    return (
        <section className={`${className} p-8`}>
            <header className="relative">
                <div className="
                absolute 
                top-0 
                left-0 
                -translate-x-full 
                -translate-y-full
                p-3
                flex
                rounded-full
                border-[0.5px]
                border-black
                ">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {user.id}
                    </span>
                </div>
                <h1 className="space-x-4 text-5xl">
                    <span>
                        {user.name}
                    </span>
                    <span className="text-slate-400 hover:text-slate-600 transition-all text-4xl">
                        #
                        {user.username}
                    </span>
                </h1>
                <div className="
                flex
                space-x-4
                ">
                    <a href={`mailto:${user.email}`}>
                        {user.email}
                    </a>
                    <a href={user.website} target="_blank" rel="noopener noreferrer">
                        {user.website}
                    </a>
                    <a href={`tel:${user.phone}`}>
                        {user.phone}
                    </a>
                </div>
            </header>
            <main>
                <div className="
                flex
                align-bottom
                space-x-4
                ">
                    <LabeledContent label="Calle">
                        {user.address.street}
                    </LabeledContent>
                    <LabeledContent label="Número">
                        {user.address.suite}
                    </LabeledContent>
                    <LabeledContent label="Ciudad">
                        {user.address.city}
                    </LabeledContent>
                    <LabeledContent label="Código Postal">
                        {user.address.zipcode}
                    </LabeledContent>
                    <LabeledContent label="Latitud">
                        {twoDigitDecimal(user.address.geo.lat)}
                    </LabeledContent>
                    <LabeledContent label="Longitud">
                        {twoDigitDecimal(user.address.geo.lng)}
                    </LabeledContent>
                </div>
            </main>
        </section>
    );
}

export default async function UserPage(props: PropsType) {
    const id = Number.parseInt(props.params.id);
    const user = (await getUsers())[id - 1];

    return (
        <div className="grid grid-cols-3 shadow-lg p-4">
            <UserDetails user={user} className="col-span-2 border-r border-r-slate-600" />
            <CompanyDetails company={user.company} />
        </div>
    );
}
