"use strict";
/*
<img id="imgImage" src="../../../MNPics/MN30000615-NubilesPorn-Pussy-Cats/img/pussy_cats_083.jpg" alt="Free Erotic Nude Model Pussy Picture" style="border-width:0px;">
*/
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
// import fetch from 'node-fetch';

function saveImageToDisk(url, filename) {
  fetch(url)
    .then((res) => {
      const dest = fs.createWriteStream(filename);
      res.body.pipe(dest);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Extract all imageLinks from the page
const getImgLnks = async (baseURL) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  // Get the page url from the user
  try {
    await page.goto(baseURL, { waitUntil: "networkidle0" });
    await page.waitForSelector("body");

    let imageBank = await page.evaluate(() => {
      let imgTags = Array.from(document.querySelectorAll("img"));

      let imageArray = [];

      imgTags.map((image) => {
        let src = image.src;

        let srcArray = src.split("/");
        let pos = srcArray.length - 1;
        let filename = srcArray[pos];

        imageArray.push({
          src,
          filename,
        });
      });

      return imageArray;
    });

    await browser.close();

    imageBank.map((image) => {
      let filename = `./images/${image.filename}`;
      saveImageToDisk(image.src, filename);
    });
    //return imageBank
  } catch (err) {
    console.log(err);
  }
};

async function startSifoning(baseURL) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  // Get the page url from the user
  let linkedUrls;
  try {
    await page.goto(baseURL, { waitUntil: "networkidle0" });

    let body = await page.waitForSelector("body");

    linkedUrls = await page.evaluate(() => {
      let tmpLinkedUrls = [];

      let imgLinks = document.querySelectorAll("a>img");
      //   imgLinks.forEach = [].forEach;
      //   imgLinks.forEach((itm) => {
      //     let lnk = itm.ParentElement;
      //     tmpLinkedUrls.push(lnk.href);
      //   });
      return tmpLinkedUrls;
    });

    await browser.close();
  } catch (err) {
    console.log(err);
  }

  linkedUrls.forEach((lnkUrl) => {});
}

const DownloadImageInPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("response", async (response) => {
    const url = response.url();
    if (response.request().resourceType() === "image") {
      response.buffer().then((file) => {
        const fileName = url.split("/").pop();
        const filePath = path.resolve(__dirname, fileName);
        console.log("putting image in " + filePath);
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(file);
      });
    }
  });
  await page.goto("https://memeculture69.tumblr.com/");
  await browser.close();
};

async function startSifoning00(baseURL) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  // Get the page url from the user

  try {
    await page.goto(baseURL, { waitUntil: "networkidle0" });
    let body = await page.waitForSelector("body");
    const linkedUrls = [];
    await page.evaluate(() => {
      let imgLinks = document.querySelectorAll("a>img");
    });

    let imageBank = await page.evaluate(() => {
      // we get links in the page to reach images
      let imgLinks = document.querySelectorAll("a>img");
      imgLinks.forEach = [].forEach;
      imgLinks.forEach((itm) => {
        let lnk = itm.ParentElement;
        getImgLnks(lnk.href);
      });

      // we get pure links without child
      //Array.from(document.querySelectorAll('a'));
      let pageLinks = document.querySelectorAll("a");
      pageLinks.filter = [].filter;
      let links2Page = pageLinks.filter((lnk) => {
        lnk.childElementCount == 0;
      });

      let imageArray = [];

      imgTags.map((image) => {
        let src = image.src;

        let srcArray = src.split("/");
        let pos = srcArray.length - 1;
        let filename = srcArray[pos];

        imageArray.push({
          src,
          filename,
        });
      });

      return imageArray;
    });

    await browser.close();
    return imageBank;
  } catch (err) {
    console.log(err);
  }
}

async function runOnGoogle() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });
    await page.goto('https://www.google.com/search?q=.net+core&rlz=1C1GGRV_enUS785US785&oq=.net+core&aqs=chrome..69i57j69i60l3j69i65j69i60.999j0j7&sourceid=chrome&ie=UTF-8');

    const IMAGE_SELECTOR = '#tsf > div:nth-child(2) > div > div.logo > a > img';
    let imageHref = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('src').replace('/', '');
    }, IMAGE_SELECTOR);

    console.log("https://www.google.com/" + imageHref);
    var viewSource = await page.goto("https://www.google.com/" + imageHref);
    fs.writeFile(".googles-20th-birthday-us-5142672481189888-s.png", await viewSource.buffer(), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

    browser.close();
}

// Run the script on auto-pilot
(async function () {
  await DownloadImageInPage();

  await runOnGoogle();
  
  let url = "https://stocksnap.io";

  await startSifoning(url);

  // let imageLinks = await extractImageLinks()
  // console.log(imageLinks)

  // imageLinks.map((image) => {
  //     let filename = `./images/${image.filename}`
  //     saveImageToDisk(image.src, filename)
  // })
})();
