import express from 'express';
import Producto from '../productos';
import Productos from '../class/producto';
import { contenido } from '../modules/app.js';
import { productos, dbIDs, lastID } from '../modules/data.js';

/**
 * DATOS A MANIPULAR
 */


const router = express.Router();

//Creando algunos Productos para pruebas
//Comentar para verificar el error de no existen productos.

for (let id = 1; id <= 4; id++) {
  const newDato = contenido();
  const newProducto = new Productos(
    newDato.producto,
    newDato.precio,
    newDato.url,
    id
  );
  productos.push(newProducto);
  dbIDs.push(id);
  lastID.lastID = id;
}

/*Mostrando los productos*/
const miProducto = new Producto();
router.get('/listar', (req, res) => {
  const data = miProducto.leer();
  if (data.length == 0) {
    res.json({
      msg: 'no hay productos cargados',
    });
  }
  res.json({
    data,
  });
});


/*Listando los productos por id*/
router.get('/listar/:id', (req, res) => {
    const id = req.params.id;
    const data = miProducto.leerPorId(id);
    if (!data) {
      res.json({
        msg: 'Error producto no encontrado',
      });
    }
    res.json({
      data,
    });
  });

  /* Creamos nuestra llamada vista */
router.get('/vista', (req, res) => {
  const dinamicData = {
    style:'table-dark',
    data: miProducto.leer(),
  }
  
  res.render('main', dinamicData);
});

/*Para agregar productos a nuestra api*/
router.post('/guardar', (req, res) => {
    const body = req.body;
    const producto = miProducto.guardar(body);
    res.json({
      producto,
    });
    
    //Se incrementa el lastID.lastID por que se va a guarda un nuevo valor.
    lastID.lastID = lastID.lastID + 1;

    const data = new Productos(
      body.producto,
      body.precio,
      body.url,
      lastID.lastID
    );
    productos.push(data);
    dbIDs.push(lastID.lastID);

    //Validando si el guarda es usado desde el form o via json/api
    if (body.form === 'true') {
      //Deprecated el form no se usa desde un submit, se reemplaza por websocket
      res.redirect(301, '/');
    } else {
      res.json({
        data,
      });
    }

});

  

/*Para actualizar productos por id*/  
router.put('/actualizar/:id', (req, res) => {
    const body = req.body; 
    const id = req.params.id;
    const producto = miProducto.actualizar(body,id);
    res.json({
      producto,
    });
  });  

/*Para borrar productos por id*/   
router.delete('/borrar/:id', (req, res) => {
    const id = req.params.id;
    const producto = miProducto.borrar(id);
    res.json({
      producto,
    });
  });   

/*Utilizando Multer para subir nuestro archivo index.html ubicado 
en la carpeta public*/  
const multer = require('multer');
const upload = multer({ dest: './uploads' });  

/*Creando la carpeta uploads para cargar archivos*/
const folderName = './uploads';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderName);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

/*Mediante la llamada post cargamos el archivo en la carpeta uploads*/  
const uploadMejorado = multer({ storage: storage });
router.post('/single', uploadMejorado.single('imagen'), (req, res) => {
    try {
      res.send(req.file);
    } catch (err) {
      res.send(400);
    }
  });


export default router;















