'use strict';
/*


<img id="imgImage" src="../../../MNPics/MN30000615-NubilesPorn-Pussy-Cats/img/pussy_cats_083.jpg" alt="Free Erotic Nude Model Pussy Picture" style="border-width:0px;">

*/
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require('fs')

function saveImageToDisk(url, filename) {
    fetch(url)
        .then(res => {
            const dest = fs.createWriteStream(filename);
            res.body.pipe(dest)
        })
        .catch((err) => {
            console.log(err)
        })
}

// Extract all imageLinks from the page
async function extractImageLinks(baseURL) {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    // Get the page url from the user
    try {
        await page.goto(baseURL, { waitUntil: 'networkidle0' });
        await page.waitForSelector('body');

        let imageBank = await page.evaluate(() => {
            let imgTags = Array.from(document.querySelectorAll('img'));

            let imageArray = [];

            imgTags.map((image) => {
                let src = image.src;

                let srcArray = src.split('/');
                let pos = srcArray.length - 1;
                let filename = srcArray[pos];

                imageArray.push({
                    src,
                    filename
                });
            });

            return imageArray
        })

        await browser.close();

        imageBank.map((image) => {
            let filename = `./images/${image.filename}`
            saveImageToDisk(image.src, filename)
        })
        //return imageBank
    } catch (err) {
        console.log(err)
    }
}

async function startSifoning(baseURL) {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    // Get the page url from the user

    try {
        await page.goto(baseURL, { waitUntil: 'networkidle0' });
        await page.waitForSelector('body');

        let imageBank = await page.evaluate(() => {
            // we get links in the page to reach images
            let imgLinks = document.querySelectorAll("a>img");
            imgLinks.forEach = [].forEach;
            imgLinks.forEach((itm) => {
                let lnk = itm.ParentElement;
                extractImageLinks(lnk.href);
            });

            // we get pure links without child
            //Array.from(document.querySelectorAll('a'));
            let pageLinks = document.querySelectorAll('a');
            pageLinks.filter = [].filter;
            let links2Page = pageLinks.filter(lnk => { lnk.childElementCount == 0 });

            let imageArray = [];

            imgTags.map((image) => {
                let src = image.src;

                let srcArray = src.split('/');
                let pos = srcArray.length - 1;
                let filename = srcArray[pos];

                imageArray.push({
                    src,
                    filename
                });
            });

            return imageArray
        });

        await browser.close()
        return imageBank

    } catch (err) {
        console.log(err)
    }
}

// Run the script on auto-pilot
(async function () {
    let url = "https://stocksnap.io";

    await startSifoning(url);

    // let imageLinks = await extractImageLinks()
    // console.log(imageLinks)

    // imageLinks.map((image) => {
    //     let filename = `./images/${image.filename}`
    //     saveImageToDisk(image.src, filename)
    // })
})()