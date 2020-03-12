const puppeteer = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const config = require("./config");

(async () => {
	const args = ["--disable-gpu", "--start-maximized", "--disable-infobars"];
	puppeteer.use(stealth());

	const browser = await puppeteer.launch({headless: false, args: args});
	const page = await browser.newPage();

	await page.setViewport({width: 1125, height: 2436, isMobile: true, hasTouch: true});
	await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/78.0.3882.0 Mobile/13B143 Safari/601.1.46");

	await (await browser.pages())[0].close();
	await page.goto("https://www.supremenewyork.com/mobile/");

	await page.addScriptTag({content: `window.wasmbinsrc = "${config.wasmUrl}"`});
	await page.addScriptTag({url: config.bootstrapUrl});
	
	console.log("Ticket enabled.");
})();