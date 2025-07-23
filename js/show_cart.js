function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const container = document.getElementById('cart-container');

  if (carrito.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  let html = `
    <h1>Productos en tu carrito:</h1>
    
    <ul class="cart-items">`;
  
  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.price * item.cantidad;
    total += subtotal;
    
    html += `
    <li class="cart-item">
        <div class="item-info">
            <input type="number" min="1" value="${item.cantidad}" 
                class="item-quantity" data-index="${index}">
                <div>
                <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span></div>
                </div>
        </div>
        <div class="item-controls">
            <button class="btn-remove" title="eliminar producto" data-index="${index}" aria-label="Remove item">✕</button>
            <span class="item-subtotal">$${subtotal.toFixed(2)}</span>
        </div>
    </li>`;
  });

  html += `</ul>
  <button id="remove-all" class="btn-remove-all">Vaciar Carrito</button>
    <div class="cart-total">
      <h3>Total: $${total.toFixed(2)}</h3>
    </div>`;
  
  container.innerHTML = html;

  document.querySelectorAll('.btn-remove').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      removeFromCart(index);
    });
  });

  document.querySelectorAll('.item-quantity').forEach(input => {
    input.addEventListener('change', function() {
      const index = parseInt(this.getAttribute('data-index'));
      const newQuantity = parseInt(this.value);
      updateQuantity(index, newQuantity);
    });
  });

  document.getElementById('remove-all').addEventListener('click', removeAllItems);
}

function removeFromCart(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) return;
  
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito[index].cantidad = newQuantity;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function removeAllItems() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);