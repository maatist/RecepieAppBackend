const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Matiseto98',
    database: 'recetapp'
});

// Rutas
app.get('/', function(req, res) {
    res.send('Bienvenido a mi API')
});

// All Recepies

app.get('/recepies', (req,res) => {

    const sql = 'SELECT * FROM recetas';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        } else {
            res.send(' No hay resultados')
        }
    
        });

})

app.get('/recepies/:id', (req,res) => {

    const {id} = req.params
    const sql = `SELECT * FROM recetas WHERE id_receta = ${id}`

    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        } else {
            res.send(' No hay resultados')
        }
    
        });



})

app.post('/add', (req,res)=> {

    const sql = 'INSERT INTO recetas SET ?';

    const recepieObj = {
        "id_receta": req.body.id_receta,
        "id_usuario_autor": req.body.id_usuario_autor,
        "titulo": req.body.titulo,
        "descripcion":  req.body.descripcion,
        "tiempo_preparacion": req.body.tiempo_preparacion,
        "fecha_creacion": req.body.fecha_creacion,
        "receta_foto_path": req.body.receta_foto_path

    }

    connection.query(sql, recepieObj, error => {
        if(error) throw error;
        res.send('Receta creada!');

    });

})

app.put('/update/:id', (req,res) =>{

    const {id} = req.params;
    const {titulo, descripcion, tiempo_preparacion, receta_foto_path} = req.body;

    const sql = `UPDATE recetas SET titulo = '${titulo}', descripcion = '${descripcion}', tiempo_preparacion = '${tiempo_preparacion}', 
    receta_foto_path = '${receta_foto_path}' WHERE id_receta = '${id}'`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Receta actualizada!');


    });
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    const sql = `DELETE FROM recetas WHERE id_receta = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Receta eliminada!');


    });
})








// Check connection

connection.connect(error => {
    if(error) throw error;
    console.log('El servidor de DB esta corriendo')
}); 

app.listen(PORT, () => console.log('El servidor esta corriendo en el puerto ' + PORT));

