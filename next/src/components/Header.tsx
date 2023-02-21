import Head from "next/head";
import { ListItem } from "./ListItem";

export interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return <>
        <Head>
            <title>{title}</title>
        </Head>
        <header className="inset-x-0 font-mono">
            <nav>
                <ul className="flex justify-between text-xl md:justify-center md:text-2xl py-7">
                    <ListItem href="/">home</ListItem>
                    <ListItem href="/about/">about</ListItem>
                    <ListItem href="/contact/">contact</ListItem>
                    <ListItem href="/posts/">posts</ListItem>
                </ul>
            </nav>
            <h1 className="w-full text-4xl font-bold p-4 bg-primary-700 text-center">
                <span className="text-primary-200">/</span>{title}<span className="text-primary-200">/</span>
            </h1>
        </header>
    </>;
}