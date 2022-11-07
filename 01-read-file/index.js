import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stream = new fs.ReadStream(path.join(__dirname, "text.txt"));
stream.on('readable', () => {
    const data = stream.read();
    if (data != null) console.log(data.toString());
})