import socketIo from 'socket.io';
import { guardarFromForm } from '../modules/guardar';
import { productos } from '../modules/data.js';


export const initWSServer = (server) => {
    const io = socketIo(server);
    
    io.on('connection', (socket) => {
        console.log('Nueva Conexion establecida!');

        socket.on('new-product', (data) => {
            let res = guardarFromForm(data);

            if (res === 400) {
                socket.emit('messages', 'Datos no validos en el formulario');
            } else {
                let producto = [productos[productos.length - 1]];
                io.emit('update', producto);
            }
            //RESPUESTA A UN SOLO CLIENTE
            // socket.emit('messages', messages);
      
            //ENVIARLE MENSAJE A TODOS
            //io.emit('update', messages);
      
            //PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE ME LO MANDO
            // socket.broadcast.emit('messages', messages);
        });

        socket.on('askProducts', () => {
            console.log('Envie los productos');
            if (productos.length > 0) {
              socket.emit('update', productos);
            }
        });

    
    });

    return io;
};    

