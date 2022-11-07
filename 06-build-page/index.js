import * as fs from 'fs';
import { copyFile, rm, writeFile } from 'fs/promises';
import { createWriteStream, mkdir } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// создаем папку project-dist
await rm (path.join(__dirname, 'project-dist'), { recursive: true, force: true });
mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});
// работа с html
const outputHtml = createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
fs.readFile(path.join(__dirname, 'template.html'), async (err, data) => {
    if (err) throw err;
    let htmlTemplate = data.toString();
    const components = await readdir(path.join(__dirname, 'components'), { withFileTypes: true })
    for (let component of components) {
        if (component.isFile && path.extname(component.name) === '.html') {
            const tagname = component.name.split('.')[0];
            const content = await (await readFile(path.join(__dirname, 'components', component.name))).toString();
            htmlTemplate = htmlTemplate.replace(`{{${tagname}}}`, content);
        }
    }
    outputHtml.write(htmlTemplate);
})
// работа с css
const outputCSS = createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
const cssFiles = await readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
for (let cssFile of cssFiles) {
    if (cssFile.isFile() && path.extname(cssFile.name) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', cssFile.name), (err, data) => {
            if (err) throw err;
            outputCSS.write(data);
        })  
    }
}
// работа с assets
mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
    if (err) throw err;
});
async function copyAssets(assets) {
    for (let asset of assets) {
        if (asset.isFile()) {
            await writeFile(path.join(__dirname, 'assets', asset.name), '');
            await copyFile(path.join(__dirname, 'assets', asset.name), path.join(__dirname, 'project-dist', 'assets', asset.name));
        } else {
            const filesInDir = await readdir(path.join(__dirname, 'assets', asset.name), { withFileTypes: true });
            for (let file of filesInDir) {
                mkdir(path.join(__dirname, 'project-dist', 'assets', asset.name), { recursive: true }, (err) => {
                    if (err) throw err;
                });
                await writeFile(path.join(__dirname, 'project-dist', 'assets', asset.name, file.name), '');
                await copyFile(path.join(__dirname, 'assets', asset.name, file.name), path.join(__dirname, 'project-dist', 'assets', asset.name, file.name));
            }
        }
    }
}
const assetsFiles = await readdir(path.join(__dirname, 'assets'), { withFileTypes: true });
copyAssets(assetsFiles);