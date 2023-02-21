import { ListItem } from "./ListItem";

export interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header className="inset-x-0 font-mono">
            <nav>
                <ul className="flex justify-center text-2xl gap-12 py-7">
                    <ListItem content="home" href="/" />
                    <ListItem content="about" href="/about/" />
                    <ListItem content="contact" href="/contact/" />
                    <ListItem content="posts" href="/posts/" />
                </ul>
            </nav>
            <h1 className="w-full text-4xl font-bold p-4 bg-primary-700 text-center">
                <span className="text-primary-200">/</span>{title}<span className="text-primary-200">/</span>
            </h1>
        </header>
    );
}