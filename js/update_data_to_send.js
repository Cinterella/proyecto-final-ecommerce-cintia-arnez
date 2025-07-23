function updateFormFields() {

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoData = document.getElementById('carritoData');
    const totalCarrito = document.getElementById('totalCarrito');
    
    if (carrito.length === 0) {
        carritoData.value = "Carrito vacío";
        totalCarrito.value = "0";
        return;
    }

    let cartText = carrito.map(item => 
        `${item.name} - $${item.price.toFixed(2)} x ${item.cantidad} = $${(item.price * item.cantidad).toFixed(2)}`
    ).join('\n');


    // CALculo el total
    const total = carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0);

    carritoData.value = cartText;
    totalCarrito.value = total.toFixed(2);
}

function removeFromCart(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        updateFormFields(); 
}

function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) return;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad = newQuantity;
    localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        updateFormFields();
}

function removeAllItems() {
    localStorage.removeItem('carrito');
        mostrarCarrito();
        updateFormFields();
}

document.addEventListener('DOMContentLoaded', function() {
        mostrarCarrito();
        updateFormFields();
});