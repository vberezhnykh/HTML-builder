import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import * as fs from 'node:fs';

const rl = readline.createInterface( {input, output });

const outputFile = fs.createWriteStream('result.txt');

console.log('Напиши что-нибудь, чтобы сохранить в файл...\n')
rl.on('line', (input) => {
    if (input === 'exit') {
        console.log('Сохранение написанного в файл...');
        rl.close();
    } else {
        console.log(`"${input}" сохранено в файл. Можно продолжить или завершить процесс.`);
        outputFile.write(`${input}\n`);
    };
})

rl.on('SIGINT', () => {
    console.log('Сохранение написанного в файл...');
    rl.close();
});






