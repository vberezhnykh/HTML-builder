import { readdir, stat } from 'node:fs/promises';

try {
    const files = await readdir('secret-folder', {withFileTypes: true});
    for (const file of files) {
        if (file.isFile()) {
            const name = file.name.split('.')[0];
            const ext = file.name.split('.')[1];
            const fileSize = await stat(`./secret-folder/${file.name}`, (err, stats) => {
                if (err) console.error(err);
                else return stats;
            });
            console.log(`${name} - ${ext} - ${fileSize.size} bytes`);    
        } 
    };
} catch (err) {
    console.error(err);
}