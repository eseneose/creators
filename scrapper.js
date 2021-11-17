const puppeteer = require('puppeteer');


async function scrapeChannel(url) {

    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });


    try {
        await page.waitForXPath('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/app-header-layout/div/app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string');
    } catch (err) {
        console.log("coundn't find selector for Name")
    }
    const [el] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/app-header-layout/div/app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();


    try {
        await page.waitForXPath('//*[@id="img"]');

    } catch (err) {
        console.log("coundn't find selector for picture")
    }
    const [el2] = await page.$x('//*[@id="img"]');
    const src = await el2.getProperty('src');
    const avatarUrl = await src.jsonValue();


    browser.close();

    console.log({ name, avatarUrl })
    return { name, avatarUrl }
}
module.exports = {
    scrapeChannel
}