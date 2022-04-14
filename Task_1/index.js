import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter a string\n', (answer) => {
    rl.close();
    let i = 1;
    for (let char of [...answer]) {
        console.log(`${char}-${i}`);
        i += 1;
    }
});
