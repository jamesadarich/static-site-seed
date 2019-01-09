import { AsyncTest, Expect, Timeout, TestFixture } from "alsatian";
import * as puppeteer from "puppeteer";
import pixelmatch = require("pixelmatch");
import { PNG } from "pngjs";
import { createReadStream, createWriteStream } from "fs";
import { join } from "path";

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

    @AsyncTest("desktop")
    @Timeout(5000)
    public async desktop() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto("http://localhost:8080/");

        const baseImageName = "home-page";

        await page.screenshot({ path: join(__dirname, `./${baseImageName}.actual.png`) });

        const expectedPng = await loadPng(`./${baseImageName}.expected.png`);
        const actualPng = await loadPng(`./${baseImageName}.actual.png`);

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

        await writePng(join(__dirname, `${baseImageName}.diff.png`), diffPng);

        Expect(diffPixels).toBe(0);
    }
}
