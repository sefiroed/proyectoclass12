const socket = io.connect();

let submit = document.getElementById('form-product');

//Pedimos la data que hay actualmente enviando un socket
socket.emit('askProducts');

// Si emite un mensaje individual
socket.on('messages', (data) => {
    console.log('RECIBI MENSAJE');
    alert(data);
});

// Mensaje para todos los clientes
socket.on('update', (products) => {
    products.forEach((product) => {
      render(product);
    });
});

submit.addEventListener('submit', (e) => {
    let form = e.target;
    let inputs = new Object();
    e.preventDefault();
    form = submit.getElementsByTagName('input');

    for (let index = 0; index < form.length; index++) {
        inputs[form[index].name] = form[index].value;
    }
    console.log(inputs);
    socket.emit('new-product', inputs);
});

render = (data) => {
    let listProduct = document.getElementById('list-Product');
    let newElement = document.createElement('tr');
    let htmlProducto = `
        <td>${data.producto}</td>
        <td>${data.precio}</td>
        <td>
            <div class='text-center wd-100'>
                <div
                class='card'
                style='width: 4rem; margin-left: auto; margin-right: auto;'
                >
                    <img
                        src='${data.url}'
                        class='card-img-top mx-auto d-block'
                        alt='...'
                    />
                </div>
            </div>
        </td>
        `;
    newElement.innerHTML = htmlProducto;
    listProduct.appendChild(newElement);
};

