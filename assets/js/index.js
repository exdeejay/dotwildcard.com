async function sleep(secs) {
    return new Promise((resolve) => {
        setTimeout(resolve, secs * 1000);
    });
}

async function animateType(elem, str, secsPerLetter) {
    for (let c of str) {
        elem.innerText += c;
        await sleep(secsPerLetter);
    }
}

async function animateBackspace(elem, secsPerLetter) {
	let str = elem.innerText;
	for (let c of str) {
		elem.innerText = elem.innerText.slice(0, -1);
		await sleep(secsPerLetter);
	}
}

document.body.onload = async () => {
    let regex = document.querySelector('header h1 span.regex');
	let subtitle = document.querySelector('header h2');
	await sleep(2);
	while (true) {
		await animateType(regex, '.*', 0.5);
		await sleep(1);
		await animateBackspace(regex, 0.1);
		await sleep(0.5);
		await animateType(regex, 'dotWildcard', 0.1);
		if (subtitle.getAttribute('class') == 'subtitle-hidden') {
			subtitle.removeAttribute('class');
		}
		await sleep(10);
		await animateBackspace(regex, 0.1);
		await sleep(1);
	}
};
