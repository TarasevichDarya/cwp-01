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
