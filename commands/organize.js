const fs = require('fs');
const path = require('path');
let types = {
	media: ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv'],
	archives: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
	documents: ['docx', 'pdf', 'xls', 'ppt', 'txt', 'csv'],
	spreadsheets: ['xlsx', 'ods'],
	presentations: ['pptx', 'odp'],
	programming: ['js', 'html', 'css', 'py', 'cpp', 'java'],
	databases: ['mdb', 'accdb', 'sql'],
	fonts: ['ttf', 'otf'],
	executables: ['exe', 'dll', 'app'],
	system: ['ini', 'cfg', 'xml'],
	web: ['html', 'css', 'js', 'php', 'asp'],
	ebooks: ['epub', 'mobi', 'pdf'],
	images: ['jpg', 'png', 'gif', 'bmp', 'tiff'],
	audio: ['mp3', 'wav', 'ogg', 'flac', 'aac'],
};

function organize(srcPath) {
	// 1. to check if srcPath is present
	if (srcPath == undefined) {
		srcPath = process.cwd();
	}

	// 2. to create a directory -> Organized_files
	let organizedFiles = path.join(srcPath, 'Organized_files');
	console.log('Organized files folder path is ', organizedFiles);
	if (fs.existsSync(organizedFiles) == false) {
		fs.mkdirSync(organizedFiles);
	} else {
		console.log('folder already exists');
	}

	// 3. scan entire srcPath -> read file extensions
	let allFiles = fs.readdirSync(srcPath);

	// 4. traverse all files to classify based on their extensions
	for (let i = 0; i < allFiles.length; i++) {
		let fullPathOfFile = path.join(srcPath, allFiles[i]);
		console.log(fullPathOfFile);

		// 4.1.1 check if it a file or folder
		let isThisFile = fs.lstatSync(fullPathOfFile).isFile();
		console.log(allFiles[i] + ' is ' + isThisFile);
		if (isThisFile) {
			// 4.1.2. get file ext name
			let ext = path.extname(allFiles[i]).split('.')[1];
			// 4.1.3. get folder ext name
			let folderName = getFolderName(ext);
			copyFileToDest(srcPath, fullPathOfFile, folderName);
		}
	}
}

// 5. getFolderName fn
function getFolderName(ext) {
	for (let key in types) {
		for (let i = 0; i < types[key].length; i++) {
			if (types[key][i].toLowerCase() == ext.toLowerCase()) {
				return key;
			}
		}
	}
	return 'miscellaneous';
}

// 6. copyFileToDest fn
function copyFileToDest(srcPath, fullPathOfFile, folderName) {
	// 6.1. to create folderName path
	let destFolderPath = path.join(srcPath, 'Organized_files', folderName);
	// 6.2. check folder exist
	if (!fs.existsSync(destFolderPath)) {
		fs.mkdirSync(destFolderPath);
	}
	// 6.3. copy files from srcPath to dest folder
	let fileName = path.basename(fullPathOfFile);
	let destFileName = path.join(destFolderPath, fileName);
	fs.copyFileSync(fullPathOfFile, destFileName);
}

module.exports = {
	organize: organize,
};
