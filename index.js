"use strict";
/*
<img id="imgImage" src="../../../MNPics/MN30000615-NubilesPorn-Pussy-Cats/img/pussy_cats_083.jpg" alt="Free Erotic Nude Model Pussy Picture" style="border-width:0px;">
*/
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { DownloaderHelper } = require("node-downloader-helper");
const { v4: uuidv4 } = require('uuid');


// import fetch from 'node-fetch';

/*

https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial

https://developers.google.com/web/tools/puppeteer/examples
*/
const puppeteerLaucnhOptions = { headless: true, userDataDir: "./data" };
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
  const browser = await puppeteer.launch(puppeteerLaucnhOptions);

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
  const browser = await puppeteer.launch(puppeteerLaucnhOptions);
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

async function runOnVectorstock(){
//https://www.vectorstock.com/royalty-free-vector/space-glyph-signed-icon-set-astronomy-symbols-vector-23767865
/**
 * https://www.vectorstock.com/royalty-free-vector/internal-organs-flat-linear-long-shadow-icons-set-vector-28811088
 */
}

async function runOnGoogle(q="Cat") {
  const browser = await puppeteer.launch(puppeteerLaucnhOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  let googleSearchUrl ='https://www.google.com/search?q=${q}&tbm=isch&tbs=isz:m'.replace('{q}',q);
  await page.goto(googleSearchUrl);

  //const IMAGE_SELECTOR = '#tsf > div:nth-child(2) > div > div.logo > a > img';
  const IMAGE_SELECTOR = "img[data-iml]";
  //document.querySelectorAll("img[data-iml]")

  let imageHrefs = await page.evaluate((sel) => {
    let imgs = document.querySelectorAll(sel);
    imgs.map = [].map;
    return imgs.map((x) => x.getAttribute("src"));
  }, IMAGE_SELECTOR);

  console.log(imageHrefs);
  imageHrefs.forEach((imgUrl) => {
    if (imgUrl.indexOf("http") == 0) {
      let imgName = imgUrl.split("/").pop();
      const filePath = `${__dirname}/files`;
      const dl = new DownloaderHelper(imgUrl, filePath);
      dl.on("end", () => console.log("Download Completed"));
      dl.start();
    
    } else {
      if (imgUrl.indexOf("data:image/") == 0) {
        let base64Data = imgUrl.substring("data:image/".length);
        let p0=base64Data.indexOf(";");
        let fileExtension=base64Data.substring(0,p0);
        let p1=base64Data.indexOf(";base64,");
        base64Data=base64Data.substring(p1+";base64,".length);
        let buff = Buffer.from(base64Data, 'base64');
        let imgName ="image_"+uuidv4()+"."+fileExtension;
        fs.writeFile("./files/"+imgName, buff, (err) => {
          if (err) return console.error(err)
          console.log('file saved to ', imgName)
        })
      }
    }
  });

  browser.close();
}

async function runOnGoGoAnime(){

  [2014,2015,2016,2017,2018,2019,2020,2021].forEach(y=>{
    ['winter','spring','summer','fall'].forEach(a=> { 
  let pn=1; // page number
  let uri='https://gogoanime.wiki/sub-category/'+a+'-'+y+'-anime?page='+pn;


    });

  });

  
  let uri='https://gogoanime.wiki/sub-category/winter-2021-anime?page=4';
  /*
  Content of Season block
  .menu_series > ul > li > a
let lnks= document.querySelectorAll('.menu_series > ul > li > a');
  https://gogoanime.wiki/sub-category/summer-2019-anime?page=1
  https://gogoanime.wiki/sub-category/summer-2018-anime?page=1
  https://gogoanime.wiki/sub-category/summer-2017-anime?page=1
  https://gogoanime.wiki/sub-category/winter-2017-anime?page=1
  */
}

function download(uri, filename) {
  return new Promise((resolve, reject) => {});
}

//  This is main download function which takes the url of your image
function download00(uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", resolve);
    });
  });
}

let main = async () => {
  const browser = await puppeteer.launch(puppeteerLaucnhOptions);
  const page = await browser.newPage();
  await page.goto("https://memeculture69.tumblr.com/");
  // await page.waitFor(1000);
  const imageUrl = await page.evaluate(
    // here we got the image url from the selector.
    () => document.querySelector("img.image")
  );
  // Now just simply pass the image url
  // to the downloader function to download  the image.
  await download(imageUrl, "image.png");
};

// Run the script on auto-pilot
(async function () {
  // await DownloadImageInPage();
  // get data for the search from the image categories:
  // D:\igaDevs\PICOTI\_data\img_categories.json
  let imgCat= fs.readFileSync("D:\igaDevs\PICOTI\_data\img_categories.json");

const searchKeys=["cat","etoiles","galaxy","nebuleuse",'mobilephone','film cover','manga','anime','wild life','mushrooms','dogs','yugi oh cards'];

searchKeys.forEach( kw=> await runOnGoogle(kw) );

// await runOnGoogle();
  // await runOnGoogle();
  await main();

  let url = "https://stocksnap.io";

  await startSifoning(url);

  // let imageLinks = await extractImageLinks()
  // console.log(imageLinks)

  // imageLinks.map((image) => {
  //     let filename = `./images/${image.filename}`
  //     saveImageToDisk(image.src, filename)
  // })
})();
