let helpFunc = require('./commands/help');

let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

switch (command) {
	case 'help':
		helpFunc.help(); // help fn call
		break;
	case 'tree':
		treeFunc.tree(path); // tree fn call
		break;
	case 'organize':
		organizeFunc.organize(path); // organize fn call
		break;
	default:
		console.log('command not recognized 😭!!!');
		break;
}
