let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

switch (command) {
    case 'help':
        helpFunc.help(); // help fn call
        break;
    default:
        console.log('command not recognized 😭!!!');
        break;
}