import { Footer } from "@/components/Footer";
import { ListItem } from "@/components/ListItem";
import { AnimatedText } from "@/util/AnimatedText";
import { sleepWithAbort } from "@/util/sleepWithAbort";
import { useEffect, useState } from "react";

export default function Index() {
  let [text, setText] = useState('');
  let [altColor, setAltColor] = useState(true);

  useEffect(() => {
    setText('');
    text = '';
    setAltColor(true);
    let abortController = new AbortController();
    let anim = new AnimatedText(text, setText, abortController.signal);
    (async () => {
      const sleep = sleepWithAbort.bind(null, abortController.signal);
      await sleep(500);
      await anim.type('.*', 500);
      await sleep(1000);
      await anim.clear(250)
      await sleep(500);
      setAltColor(false);
      await anim.type('dotwildcard', 100);
    
      while (true) {
        await sleep(10000);
        await anim.clear(100);

        await sleep(1000);
        setAltColor(true)
        await anim.type('.*', 500);
        await sleep(5000);
        await anim.clear(250);

        await sleep(500);
        setAltColor(false);
        await anim.type('dotwildcard', 100);
      }
    })();

    return () => abortController.abort();
  }, []);

  return <>
    <header className="absolute inset-x-0">
        <nav>
            <ul className="flex font-mono justify-evenly text-xl sm:justify-center sm:text-2xl md:gap-8 py-7">
                <ListItem href="/about/">about</ListItem>
                <ListItem href="/contact/">contact</ListItem>
                <ListItem href="/posts/">posts</ListItem>
            </ul>
        </nav>
    </header>
    <div className="h-[87%] min-h-[400px] flex justify-center items-center text-gray-100">
      <h1 className="w-full text-[calc(2rem_+_2vw)] font-bold p-10 bg-primary-700 text-center tracking-tight shadow-[0_0_0_3rem] shadow-primary-900 font-mono">
          <span className="text-primary-300">/</span><span className={altColor ? 'text-primary-100' : ''}>{text}</span><span className="text-primary-300">/</span>
      </h1>
    </div>
    <Footer />
  </>;
}