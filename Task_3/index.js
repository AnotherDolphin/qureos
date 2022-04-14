import readline from 'readline';
import fetch from 'node-fetch';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const apiUrl = 'https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000';
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const askForDate = () => {
    return new Promise(res => rl.question('Enter a date\n', (answer) => {
        rl.close();
        res(answer);
    }));
};
const queryDate = async (input) => {
    // trim and replace any spaces with '-'
    let date = input.trim().replace(' ', '-');
    // check date structure day-month-year (00-XXXX-0000)
    if (!/\d{1,2}-[a-zA-Z]+-\d{4}/.test(date))
        return "Incorrect date structure";
    // chack that date value exists
    const checkDate = new Date(date);
    if (!checkDate.getTime)
        return "Date is invalid";
    // fetch url with input date
    const requestUrl = apiUrl.replace(/(?<=date=)\d{1,2}-[a-zA-Z]+-\d{4}/, date);
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data.data;
};
const input = await askForDate();
const output = await queryDate(input);
if (output)
    console.log(output);
else
    console.log('No result for that Date');
