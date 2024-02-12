const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    let filePath = './scripts/gen-3.txt';
    // let filePath = '/home/mclaybaugh2/bereshit-1.txt';
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        const words = lineToArray(line);
        const wrappedWords = words.map(word => {
            return `'${word}'`;
        });
        console.log('[' + wrappedWords.join(',') + '],');
    }
}

function lineToArray(line) {
    let newline = line.trim();
    let arr = [];
    let currentWord = '';
    for (let i = 0; i < newline.length; i++) {
        const currChar = newline[i];
        if (currChar === '׃' || currChar === '־') {
            if (currentWord) {
                arr.push(currentWord);
            }
            arr.push(currChar);
            currentWord = '';
        } else if (currChar === ' ') {
            arr.push(currentWord);
            currentWord = '';
        } else {
            currentWord += currChar;
        }
    }
    return arr;
}

processLineByLine();