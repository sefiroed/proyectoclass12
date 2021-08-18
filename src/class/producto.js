//Creamos una clase especial para trabajar con socket

export default class Productos {
  constructor(producto, precio, url, id) {
    this.producto = producto;
    this.precio = parseFloat(precio);
    this.url = url;
    this.id = id;
  }
}
