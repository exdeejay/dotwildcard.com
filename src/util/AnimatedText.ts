import { Dispatch, SetStateAction } from "react";
import { sleepWithAbort } from "./sleepWithAbort";

export class AnimatedText {
    constructor(private text: string, private _setText: Dispatch<SetStateAction<string>>, private signal: AbortSignal) { }

    setText(value: string) {
        this._setText(value);
        this.text = value;
    }

    async type(newText: string, msecsPerLetter: number) {
        for (let i = 0; i < newText.length; i++) {
            this.setText(this.text + newText.charAt(i));
            await sleepWithAbort(this.signal, msecsPerLetter);
        }
    }

    async clear(msecsPerLetter: number) {
        for (let i = this.text.length - 1; i >= 0; i--) {
            this.setText(this.text.slice(0, i));
            await sleepWithAbort(this.signal, msecsPerLetter);
        }
    }
}