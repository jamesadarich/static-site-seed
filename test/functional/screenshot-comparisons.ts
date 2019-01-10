import { AsyncTest, Expect, Timeout, TestFixture, SetupFixture, AsyncSetupFixture, AsyncTeardownFixture, TestCase } from "alsatian";
import * as puppeteer from "puppeteer";
import pixelmatch = require("pixelmatch");
import { PNG } from "pngjs";
import { createReadStream, createWriteStream } from "fs";
import { join } from "path";
import { app } from "../../server/app";
import { Server } from "http";

async function loadPng(path: string) {
    path = join(__dirname, path);

    return new Promise<PNG>((resolve, reject) => {
        const png = createReadStream(path)
                        .pipe(new PNG());

        png.on("parsed", () => resolve(png));
        png.on("error", reject);
    });
}

async function writePng(path: string, png: PNG) {
    return new Promise((resolve, reject) => {
        png.pack()
           .pipe(createWriteStream(path))
           .on("finish", resolve)
           .on("error", reject);
    });
}

@TestFixture("screenshot comparisons")
export class ScreenshotComparisonTests {

    private _port = 1234;
    private _app: Server;

    @AsyncSetupFixture
    private _startServer() {
        return new Promise(resolve => {            
            this._app = app.listen(this._port, resolve);
        });
    }


    @AsyncTeardownFixture
    private _closeServer() {
        return new Promise(resolve => { 
            this._app.close(resolve);
        });
    }

    @AsyncTest("desktop")
    @Timeout(5000)
    @TestCase("/", "home-page")
    @TestCase("/blog", "blog-page")
    public async desktop(path: string, pageName: string) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(`http://localhost:${this._port}${path}`);

        await page.screenshot({ path: join(__dirname, `./${pageName}.actual.png`) });

        const expectedPng = await loadPng(`./${pageName}.expected.png`);
        const actualPng = await loadPng(`./${pageName}.actual.png`);

        const diffPng = new PNG({
            width: expectedPng.width,
            height: expectedPng.height
        });

        const diffPixels = pixelmatch(
            expectedPng.data,
            actualPng.data,
            diffPng.data,
            expectedPng.width,
            expectedPng.height,
            { threshold: 0.1 }
        );

        await writePng(join(__dirname, `${pageName}.diff.png`), diffPng);

        Expect(diffPixels).toBe(0);
    }
}
