import express from 'express';
import path from 'path';
import routerProductos from './routes/productosRoute';
import handlebars from 'express-handlebars';
import * as http from 'http';
import { initWSServer } from './logicasocket/websocket';
import { productos } from './modules/data';

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;

//Creando he inisializando nuestro objeto myServer en socketIo
// const httpServer = http.createServer(app)
const myServer = http.createServer(app);
initWSServer(myServer);
myServer.listen(puerto, () => console.log('Server up en puerto', puerto));


/*Con los siguientes metodos podemos pasar el body via postman*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Invocamos a nuestra archivo index.html con una llamada al localhost:8080*/
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

/*Invocamos los path para utilizarlos en el motor de plantillas */
const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');

/* Trabajamos con el motor de plantillas handlebars */
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);

app.get('/', (req, res) => {
  const data = { mostrarFormato: true, mostrarLista: true, productos };
  res.render('main', data);
});

//Render de la pagina vista
app.get('/productos/vista', (req, res) => {
  const data = { mostrarTabla: true, productos };
  res.render('main', data);
});

/*Invocamos a nuestra carpeta ruta para realizar las llamadas*/
app.use('/api/productos', routerProductos);
