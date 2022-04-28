let fs = require('fs');
let path = require('path');
let join = require('path').join;

function getAllFiles(sourceFile) {
	try {
		let filesArr = [];
		let files = fs.readdirSync(sourceFile);
		files.forEach(function (item, index) {
			let fPath = join(sourceFile, item);
			let stat = fs.statSync(fPath);
			if(stat.isDirectory() === true) {}
			if (stat.isFile() === true) { 
				filesArr.push(item);
			}
		});
		return filesArr;
	} catch (err) {
		console.log(err);
	}
	
}

function getRegArr(reg, filesArr) {
	if(reg) {
		let jsonArr = [];
		for(var i = 0; i < filesArr.length; i++){
			if(filesArr[i].indexOf(reg)>=0){
				jsonArr.push(filesArr[i]);
			}
		}
		return jsonArr;
	} else {
		return filesArr;
	}
	
}

function renameFiles(regArr, sourceFiles, destPath) {
	let sourceFile;

	if(!fs.existsSync(destPath)) {
		fs.mkdirSync(destPath)
	} 

	for(var i = 0; i < regArr.length; i++){
		sourceFile = path.join(sourceFiles, regArr[i]);
	    dest = path.join(destPath, regArr[i]);
		try {
			fs.renameSync(sourceFile, dest, function (err) {
				if (err) throw err;
			});
		} catch (err) {
			console.log(err)
		}
	}
	
}

function moveFiles(sourceFiles, reg, destPath) {

    let filesArr = getAllFiles(sourceFiles);
	
	let regArr = getRegArr(reg, filesArr)

	renameFiles(regArr, sourceFiles, destPath)

}


async function main() {
	// let sourceFiles = path.join(__dirname, "test_lqb"); 
	// let reg = "";
	// let destPath = path.join(__dirname, "test_lqb_output"); 

	const prams = process.argv
	const sourceFiles = prams[2];
	const destPath = prams[3];
	const reg = prams[4];
	
	moveFiles(sourceFiles, reg, destPath);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

