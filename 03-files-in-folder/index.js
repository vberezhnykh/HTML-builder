import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    const files = await readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
    for (const file of files) {
        if (file.isFile()) {
            const name = file.name.split('.')[0];
            const ext = file.name.split('.')[1];
            const fileSize = await stat(path.join(__dirname, `./secret-folder/${file.name}`), (err, stats) => {
                if (err) console.error(err);
                else return stats;
            });
            console.log(`${name} - ${ext} - ${fileSize.size} bytes`);    
        } 
    };
} catch (err) {
    console.error(err);
}