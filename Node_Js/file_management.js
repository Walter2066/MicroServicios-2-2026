const fs = require('node:fs');
const data = 'Esto se escribirá en el archivo';
fs.writeFile('miArchivo.txt', data, (err) => {
 if (err) throw err;
 console.log('El archivo fue creado con éxito!');
});

fs.readFile('miArchivo.txt', 'utf8', (err, data) => {
 if (err) throw err;
 console.log(data);
});