import { Footer } from "@/components/Footer";
import { ListItem } from "@/components/ListItem";

export default function Index() {
  return <>
    <header className="absolute inset-x-0">
        <nav>
            <ul className="flex font-mono justify-evenly text-xl md:justify-center md:text-2xl md:gap-8 py-7">
                <ListItem href="/about/">about</ListItem>
                <ListItem href="/contact/">contact</ListItem>
                <ListItem href="/posts/">posts</ListItem>
            </ul>
        </nav>
    </header>
    <div className="h-[87%] min-h-[400px] flex justify-center items-center text-gray-100">
      <h1 className="w-full text-[calc(2rem_+_2vw)] font-bold p-10 bg-primary-700 text-center shadow-[0_0_0_3rem] shadow-primary-900 font-mono">
          <span className="text-primary-200">/</span>dotwildcard<span className="text-primary-200">/</span>
      </h1>
    </div>
    <Footer />
  </>;
}