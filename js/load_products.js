function renderizarDetalleCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const detalleDiv = document.getElementById('detalle');

  if (!detalleDiv) return; // Si no está el div, salgo.

  if (carrito.length === 0) {
    detalleDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  let html = '<h3>Resumen de tu Compra:</h3><br>';
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.price * item.cantidad;
    html += `${item.name} — U$D ${item.price} x ${item.cantidad} = U$D ${subtotal.toFixed(2)}<br>`;
    total += subtotal;
  });

  html += `<br><strong>Total a pagar: U$D ${total.toFixed(2)}</strong>`;

  detalleDiv.innerHTML = html;
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const index = carrito.findIndex(item => item.id === producto.id);

  if (index > -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  alert(`Se agregó "${producto.name}" al carrito.`);
  
  renderizarDetalleCarrito();
}

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('product-list');

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product_details">
          <h3>${product.name}</h3>
          <h4>Precio: <span>U$D ${product.price}</span></h4>
          <span>${product.description}</span>
          <button 
            class="add-to-cart-btn"
            data-id="${product.id}" 
            data-name="${product.name}" 
            data-price="${product.price}"
          >
            Agregar al carrito
          </button>
        </div>
      `;
      container.appendChild(productDiv);
    });

    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        const btn = e.target;
        const producto = {
          id: Number(btn.getAttribute('data-id')),
          name: btn.getAttribute('data-name'),
          price: Number(btn.getAttribute('data-price'))
        };
        agregarAlCarrito(producto);
      }
    });

    // Renderizo detalle si estoy en carrito.html y el div existe al cargar
    renderizarDetalleCarrito();
  })
  .catch(error => {
    console.error('Error loading products:', error);
  });
