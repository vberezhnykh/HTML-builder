import { createWriteStream, read, readFile, ReadStream, write  } from "fs";
import { readdir, writeFile, copyFile, mkdir } from "fs/promises";

try {
    //создание папки проекта и работа с html
    mkdir('project-dist', { recursive: true }, (err) => {
        if (err) console.log(err.message);
    });
    let htmlTemplate = '';
    readFile('template.html', 'utf8', (err, data) => {
        if (err) throw err;
        htmlTemplate += data;
    })
    
    let articlesTemplate = '';
    let footerTemplate = '';
    let headerTemplate = '';

    const components = await readdir('components', { withFileTypes: true })
    for (let component of components) {
        readFile(`components/${component.name}`, 'utf8', (err, data) => {
            if (err) throw err;
            if (component.name.split('.')[0] === 'articles') {
                articlesTemplate += data;
                htmlTemplate = htmlTemplate.replace(`{{${component.name.split('.')[0]}}}`, `${articlesTemplate}`);
            } else if (component.name.split('.')[0] === 'footer') {
                footerTemplate += data;
                htmlTemplate = htmlTemplate.replace(`{{${component.name.split('.')[0]}}}`, `${footerTemplate}`);
            } else {
                headerTemplate += data;
                htmlTemplate = htmlTemplate.replace(`{{${component.name.split('.')[0]}}}`, `${headerTemplate}`);
            };
        })
    }
    setTimeout(async () => {
        await writeFile('project-dist/index.html', htmlTemplate)
    }, 1000);

    //работа с css
    const cssFiles = await readdir('styles', { withFileTypes: true });
    let styles = [];
    for (let file of cssFiles) {
        const ext = file.name.split('.')[1];
        if (file.isFile() && ext === 'css') {
            readFile(`styles/${file.name}`, 'utf8', (err, data) => {
                if (err) throw err;
                styles.push(data);
            })
        }
    }
    setTimeout(async () => {
        await writeFile('project-dist/style.css', styles, (err) => {
            if (err) console.log(err.message);
        }, 1000);
    });

    //работа с assets
    mkdir('project-dist/assets', { recursive: true });
    const assetsFiles = await readdir('assets', { withFileTypes: true });
    for (let asset of assetsFiles) {
        if (asset.isFile()) {
            await writeFile(`project-dist/assets/${asset.name}`, '');
            await copyFile(`assets/${asset.name}`, `project-dist/assets/${asset.name}`);
        } else {
            const assetsFiles = await readdir(`assets/${asset.name}`, { withFileTypes: true });
            for (let file of assetsFiles) {
                mkdir(`project-dist/assets/${asset.name}`, { recursive: true });
                await writeFile(`project-dist/assets/${asset.name}/${file.name}`, '');
                await copyFile(`assets/${asset.name}/${file.name}`, `project-dist/assets/${asset.name}/${file.name}`);
            }
        }
    }
    
} catch (err) {
    console.log(err);
}