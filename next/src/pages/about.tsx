import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function About() {
    return <>
        <Header title={'about'} />
        <main className="grow lg:w-[800px] mx-auto mt-6 p-8 bg-primary-800">
            hi there!
        </main>
        <Footer />
    </>
}