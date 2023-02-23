import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface PageProps {
    title: string;
    children: ReactNode;
}

export function Page({ title, children }: PageProps) {
    return <>
        <Header title={title} pageTitle={`${title} :: dotwildcard`} />
        <main className="grow w-full md:w-[theme(screens.md)] mx-auto mt-6 p-2 md:p-8 bg-primary-800">
            {children}
        </main>
        <Footer />
    </>
}