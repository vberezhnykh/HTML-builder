import * as fs from 'fs';
import { readdir, writeFile } from 'fs/promises';

try {
    const files = await readdir('styles', { withFileTypes: true });
    let styles = [];
    for (let file of files) {
        const ext = file.name.split('.')[1]
        if (file.isFile() && ext === 'css') {
            fs.readFile(`styles/${file.name}`, 'utf8', (err, data) => {
                if (err) throw err;
                styles.push(data);
            })
        }
    }
    setTimeout(async () => {
        await writeFile('project-dist/bundle.css', styles, (err) => {
        if (err) console.log(err.message);
    })
    }, 100);
    
} catch (err) {
    console.log(err.message)
}