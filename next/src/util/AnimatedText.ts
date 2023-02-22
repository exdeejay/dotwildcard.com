import { Dispatch, SetStateAction } from "react";
import { sleep } from "./sleep";

export class AnimatedText {
    constructor(private text: string, private _setText: Dispatch<SetStateAction<string>>) { }

    setText(value: string) {
        this._setText(value);
        this.text = value;
    }

    async type(newText: string, msecsPerLetter: number) {
        for (let i = 0; i < newText.length; i++) {
            this.setText(this.text + newText.charAt(i));
            await sleep(msecsPerLetter);
        }
    }

    async clear(msecsPerLetter: number) {
        for (let i = this.text.length - 1; i >= 0; i--) {
            this.setText(this.text.slice(0, i));
            await sleep(msecsPerLetter);
        }
    }
}