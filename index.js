const express = require('express');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 8080;


// Rutas
app.get('/', (req, res) => {
    res.send(`<h1>Mi servidor express</h1>`)
})


// lectura del archivo
const readFileAsync = async (path) =>{
    try{
        let file = await fs.promises.readFile(path, 'utf-8');
        return file;
    }
    catch(err){
        throw new Error('Error de lectura!..')
    }
}

class Contenedor {
    constructor(){
        this.producto = []
    }

    async getAll(path){
        let data = await readFileAsync(path);

        if (data){
            let dataFile = JSON.parse(data);
            // this.producto = [...dataFile];
        
        // Me devuelve un array con los productos disponibles en el server
        app.get('/productos', (req, res) => {
            res.json(dataFile)
        })

        // Me devuelve un producto al azar
        app.get('/productoRandom', (req, res) => {
            let productRandom = dataFile[Math.floor(Math.random() * dataFile.length)]
            res.json(productRandom)
        })

        }
    }
}

let ListProducts = new Contenedor();
ListProducts.getAll("./productos.txt")





// listen port
app.listen(port, () => {
    console.log('Server run on port ' + port)
})





