import { AnimatedText } from "@/util/AnimatedText";
import { sleepWithAbort } from "@/util/sleepWithAbort";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

export interface HeaderProps {
    title: string;
    pageTitle?: string;
}

export function Header({ title, pageTitle = title }: HeaderProps) {
    let [text, setText] = useState(title);
    let [altColor, setAltColor] = useState(false);

    useEffect(() => {
        setText(title);
        text = title;
        setAltColor(false);

        let abortController = new AbortController();
        let anim = new AnimatedText(text, setText, abortController.signal);
        (async () => {
            while (true) {
                const sleep = sleepWithAbort.bind(null, abortController.signal);
                await sleep(10000);
                await anim.clear(100);

                await sleep(1000);
                setAltColor(true);
                await anim.type('.*', 500);
                await sleep(2000);
                await anim.clear(250);

                await sleep(500);
                setAltColor(false);
                await anim.type(title, 100);
            }
        })();

        return () => abortController.abort();
    }, []);

    return <>
        <Head>
            <title>{pageTitle}</title>
        </Head>
        <header className="inset-x-0 font-mono">
            <nav>
                <ul className="flex justify-evenly text-xl sm:justify-center sm:text-2xl py-7">
                    <ListItem href="/">home</ListItem>
                    <ListItem href="/posts/">posts</ListItem>
                </ul>
            </nav>
            <h1 className="w-full text-4xl font-bold p-4 bg-primary-700 text-center tracking-tight">
                <span className="text-primary-300">/</span><span className={altColor ? 'text-primary-100' : ''}>{text}</span><span className="text-primary-300">/</span>
            </h1>
        </header>
    </>;
}