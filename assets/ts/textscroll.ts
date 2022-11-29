function getClasses(elem: Element): string[] {
	return elem.getAttribute('class')!.split(' ');
}

function setClasses(elem: Element, classes: string[]) {
	elem.setAttribute('class', classes.join(' '))
}

async function sleep(secs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, secs * 1000);
    });
}

async function animateType(elem: HTMLElement, str: string, secsPerLetter: number, color?: string) {
	if (color !== undefined && color !== null) {
		elem.style.color = color;
	}
    for (let c of str) {
        elem.innerText += c;
        await sleep(secsPerLetter);
    }
}

async function animateBackspace(elem: HTMLElement, secsPerLetter: number) {
	let str = elem.innerText;
	for (let c of str) {
		elem.innerText = elem.innerText.slice(0, -1);
		await sleep(secsPerLetter);
	}
	elem.removeAttribute('style')
}

document.body.onload = async () => {
    let regex = document.querySelector('h1 span.regex');
	if (regex === null) {
		return;
	}

	let text: string | null;
	let altText = regex.getAttribute('alt');
	regex.removeAttribute('alt');
	let color: string | undefined;
	if (regex.getAttribute('color') != 'no') {
		color = 'var(--color7)';
	}
	if (regex.textContent != '') {
		text = regex.textContent;
	} else {
		text = regex.getAttribute('content');
		regex.removeAttribute('content');

		await sleep(0.5);
		await animateType(regex as HTMLElement, altText as string, 0.5, color);
		await sleep(1);
		await animateBackspace(regex as HTMLElement, 0.25);
		await sleep(0.5);
		await animateType(regex as HTMLElement, text as string, 0.1);
	}
	
	while (true) {
		await sleep(10);
		await animateBackspace(regex as HTMLElement, 0.1);

		await sleep(1);
		await animateType(regex as HTMLElement, altText as string, 0.5, color);
		await sleep(5);
		await animateBackspace(regex as HTMLElement, 0.25);

		await sleep(0.5);
		await animateType(regex as HTMLElement, text as string, 0.1);
	}
};
