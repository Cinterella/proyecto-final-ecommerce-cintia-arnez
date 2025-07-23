function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const container = document.getElementById('cart-container');

  if (carrito.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    updateFormFields();
    return;
  }

  let html = `
    <h1>Productos en tu carrito:</h1>
    <ul class="cart-items">`;
  
  let total = 0;

  carrito.forEach((item, index) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.cantidad) || 1;
    const subtotal = price * quantity;
    total += subtotal;
    
    html += `
    <li class="cart-item">
        <div class="item-info">
            <input type="number" min="1" value="${quantity}" 
                   class="item-quantity" data-index="${index}">
            <span class="item-name">${item.name || 'Producto sin nombre'}</span>
            <span class="item-price">$${price.toFixed(2)}</span>
        </div>
        <div class="item-controls">
            <button class="btn-remove" title="eliminar producto" 
                    data-index="${index}" aria-label="Remove item">✕</button>
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
      const newQuantity = parseInt(this.value) || 1;
      updateQuantity(index, newQuantity);
    });
  });

  document.getElementById('remove-all').addEventListener('click', removeAllItems);
  updateFormFields();
}

function removeFromCart(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (index >= 0 && index < carrito.length) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  mostrarCarrito();
}

function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) newQuantity = 1;
  
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (index >= 0 && index < carrito.length) {
    carrito[index].cantidad = newQuantity;
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  mostrarCarrito();
}

function removeAllItems() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

function updateFormFields() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoData = document.getElementById('carritoData');
  const totalCarrito = document.getElementById('totalCarrito');
  
  if (!carritoData || !totalCarrito) return;

  if (carrito.length === 0) {
    carritoData.value = "Carrito vacío";
    totalCarrito.value = "0.00";
    return;
  }

  let cartText = carrito.map(item => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.cantidad) || 1;
    return `${item.name || 'Producto'} - $${price.toFixed(2)} x ${quantity} = $${(price * quantity).toFixed(2)}`;
  }).join('\n');

  const total = carrito.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.cantidad) || 1;
    return sum + (price * quantity);
  }, 0);

  carritoData.value = cartText;
  totalCarrito.value = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', mostrarCarrito);