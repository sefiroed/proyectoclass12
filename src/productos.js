/*Creamos nuestra clase con los metodos a utilizar 
en la carpeta index.js*/

class Producto {
  productos;
  constructor() {
    this.productos = [];
  }
  leer() {
    return this.productos;
  }
  leerPorId(id) {
    return this.productos.find((producto) => producto.id == id);
  }
  guardar(dato) {
    const producto = { id: this.productos.length, ...dato };
    this.productos.push(producto);
    return producto;
  }  
  actualizar(dato, id){
    if(this.productos.find(data => data.id ==  id) == undefined){
      return {"error": "Producto no ha sido encontrado"};
    }    
    else {
      const indice = this.productos.findIndex(data => data.id ==  id);
      dato['id'] = id
      this.productos[indice] = dato;
      return this.productos
    }
  }
  borrar(id) {
    if(this.productos.find(data => data.id ==  id) == undefined){
        return {"error": "Producto no ha sido encontrado"};
    }    
    else {
        const indice = this.productos.findIndex(data => data.id ==  id);
        this.productos.splice(indice, 1);
        return this.productos
    }
  } 
    
}


export default Producto;
