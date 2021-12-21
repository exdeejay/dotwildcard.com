/**
 * @param {*} elem 
 * @returns {string[]}
 */
function getClasses(elem) {
	return elem.getAttribute('class').split(' ');
}

/**
 * @param {*} elem 
 * @param {string[]} classes 
 */
function setClasses(elem, classes) {
	elem.setAttribute('class', classes.join(' '))
}

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
	await animateType(regex, '.*', 0.5);
	await sleep(1);
	while (true) {
		await animateBackspace(regex, 0.25);
		await sleep(0.5);
		await animateType(regex, 'dotWildcard', 0.1);
		if (getClasses(subtitle).includes('subtitle-hidden')) {
			setClasses(subtitle, getClasses(subtitle).filter(i => i != 'subtitle-hidden'));
		}
		await sleep(10);
		await animateBackspace(regex, 0.1);
		await sleep(1);
		await animateType(regex, '.*', 0.5);
		await sleep(5);
	}
};
