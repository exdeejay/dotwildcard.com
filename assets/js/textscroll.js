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

	let text = null;
	let altText = regex.getAttribute('alt');
	regex.removeAttribute('alt');
	if (regex.textContent != '') {
		text = regex.textContent;
	} else {
		text = regex.getAttribute('content');
		regex.removeAttribute('content');

		await sleep(0.5);
		await animateType(regex, altText, 0.5);
		await sleep(1);
		await animateBackspace(regex, 0.25);
		await sleep(0.5);
		await animateType(regex, text, 0.1);
	}
	
	while (true) {
		await sleep(10);
		await animateBackspace(regex, 0.1);

		await sleep(1);
		await animateType(regex, altText, 0.5);
		await sleep(5);
		await animateBackspace(regex, 0.25);

		await sleep(0.5);
		await animateType(regex, text, 0.1);
	}
};
