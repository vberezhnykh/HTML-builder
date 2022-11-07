import * as fs from 'fs';
import { readdir, writeFile } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    const outputFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
    const files = await readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    for (let file of files) {
        const ext = file.name.split('.')[1]
        if (file.isFile() && ext === 'css') {
            fs.readFile(path.join(__dirname, `styles/${file.name}`), 'utf8', (err, data) => {
                if (err) throw err;
               outputFile.write(data);
            })
        }
    }
    
} catch (err) {
    console.log(err.message)
}