import { AnimatedText } from "@/util/AnimatedText";
import { sleep } from "@/util/sleep";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

export interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    let [text, setText] = useState(title);
    let [altColor, setAltColor] = useState(false);

    useEffect(() => {
        (async () => {
            let anim = new AnimatedText(text, setText);
            
            while (true) {
                await sleep(10000);
                await anim.clear(100);

                await sleep(1000);
                setAltColor(true);
                await anim.type('.*', 500);
                await sleep(5000);
                await anim.clear(250);

                await sleep(500);
                setAltColor(false);
                await anim.type(title, 100);
            }
        })();
    }, []);

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
                <span className="text-primary-200">/</span><span className={altColor ? 'text-primary-100' : ''}>{text}</span><span className="text-primary-200">/</span>
            </h1>
        </header>
    </>;
}