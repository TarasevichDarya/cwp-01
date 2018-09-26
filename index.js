//02 console.log('Hello World');

// 03
//const name = process.argv[2];
//console.log(`Hi ${name}!`);

/* 04
process.argv.forEach(
    function(element) 
    {
        console.log(element);
    }
);
*/

const path = require('path'); //предоставляет утилиты для работы с путями к файлам и директориям
const fs = require('fs'); //модуль, содержащий ф-ции для работы с файлами и директориями

if (process.argv.length < 3) {
    console.log("Error path to dir");
    process.exit();
}
if (process.argv.length > 3) {
    console.log("So long path to dir");
    process.exit();
}

const DIR_PATH = process.argv[2];
const NEW_DIRECTORY = DIR_PATH + '\\' + path.basename(DIR_PATH);
let prefix = "";
const sum = fs.createWriteStream('summary.js');
let copyright = "";
console.log("Dir path is "+ `${DIR_PATH}`);

let readAndCopyDirectory = function (dir, prefix) {        //чт и коп дир
    fs.readdir(dir, (err, files) => {
        if(err) {
            console.error("Error read dir: " + dir);
        } else {
            files.forEach(function(element) {
                let new_unit = dir + '\\' + element;
                if(fs.statSync(new_unit).isDirectory()) {               
                    readAndCopyDirectory(new_unit, prefix + element + '/');
                } else  if(path.extname(new_unit) === ".txt"){
                    sum.write('console.log(\'' + prefix + element + '\');\n');   //запись ф в с
                    // коп файлов с copyright
                    let new_file = `${NEW_DIRECTORY}\\${path.basename(new_unit)}`;
                    let logger = fs.createWriteStream(new_file);
                    fs.readFile(new_unit, (err, data) => {
                        if(err) console.error("Error copy file")
                        else logger.write(copyright + '\n' + data + '\n' + copyright);
                    });
                    
                    
                }
                console.log("console.log(\""+ prefix + element + "\");\n");
            }, this);
        }
    });
}
console.log("Create or read/copy dir is done");

let createDir = function (callback) {

    fs.access(NEW_DIRECTORY, (err) => {
        if(err && err.code == 'ENOENT') {
            fs.mkdir(NEW_DIRECTORY, (err) => {
                if (err) console.error("Error create dir");
            });
           
        }
        else 
        {
            console.log("This directory is already created!");
            
            
        }
    });
    
    
}