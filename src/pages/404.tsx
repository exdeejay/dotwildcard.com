import { Footer } from "@/components/Footer";
import { ListItem } from "@/components/ListItem";
import Head from "next/head";

export default function Error404() {
    return <>
        <Head>
            <title>404 :: dotwildcard</title>
        </Head>
        <header className="inset-x-0 font-mono">
            <nav>
                <ul className="flex justify-evenly text-xl sm:justify-center sm:text-2xl py-7">
                    <ListItem href="/">home</ListItem>
                    <ListItem href="/posts/">posts</ListItem>
                </ul>
            </nav>
        </header>
        <div className="grow w-full flex justify-center items-center text-center">
            <div>
                <h1 className="text-[40vw] sm:text-[40vh] font-bold text-primary-800 leading-[40vh]">404</h1>
            </div>
        </div>
            
        <Footer />
    </>
}