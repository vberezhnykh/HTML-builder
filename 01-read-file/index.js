import * as fs from 'node:fs';
const stream = new fs.ReadStream("text.txt");
stream.on('readable', () => {
    const data = stream.read();
    if (data != null) console.log(data.toString());
})