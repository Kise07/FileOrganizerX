function help() {
	console.log(`These are some of FileOrganizerX commands used: 
    1.node main.js help - Display help information and available commands.
    2.node main.js tree <path> - Display the directory structure in a tree-like format.
    3.node main.js organize <path> - Organize files in the specified directory based on their file extensions.
    `);
}

module.exports = {
	help: help,
};
