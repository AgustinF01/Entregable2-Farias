// Productos precargados
const products = [
    { id: 1, name: 'Leche', price: 1000, image: './resources/milk.png' },
    { id: 2, name: 'Huevos x12', price: 2500, image: './resources/eggs.png' },
    { id: 3, name: 'Yerba', price: 2000, image: './resources/yerba.png' },
    { id: 4, name: 'Gaseosa', price: 2500, image: './resources/soda.png' },
    { id: 5, name: 'Galletas', price: 750, image: './resources/cookies.png' },
    { id: 6, name: 'Fideos', price: 1250, image: './resources/spaghetti.png' },
];

let cart = [];

// Función para mostrar productos
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4';
        productDiv.innerHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" class="img-fluid">
                <h5>${product.name}</h5>
                <p>Precio: $${product.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

// Función para agregar productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        cartItem.quantity++;
    } else {
        // Si no está, agregarlo al carrito con cantidad 1
        cart.push({ product: product, quantity: 1 });
    }
    
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        cartDiv.innerHTML += `
            <p>
                ${item.product.name} - $${item.product.price} x ${item.quantity} = $${itemTotal} 
                <button class="btn btn-danger btn-sm" onclick="confirmRemoveFromCart(${index})">Eliminar</button>
            </p>`;
        total += itemTotal;
    });

    document.getElementById('total').innerText = `Total: $${total}`;
}

// Función para confirmar la eliminación
function confirmRemoveFromCart(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        const quantityToRemove = prompt(`¿Cuántos de ${item.product.name} deseas eliminar? (Cantidad en el carrito: ${item.quantity})`, 1);
        const quantity = parseInt(quantityToRemove);
        
        if (!isNaN(quantity) && quantity > 0 && quantity <= item.quantity) {
            item.quantity -= quantity;
            if (item.quantity === 0) {
                cart.splice(index, 1); // Eliminar el producto si la cantidad llega a 0
            }
            updateCart();
        } else {
            alert("Cantidad no válida. Intenta de nuevo.");
        }
    } else {
        // Si solo hay un producto, eliminar directamente
        if (confirm(`¿Estás seguro de que deseas eliminar ${item.product.name}?`)) {
            cart.splice(index, 1);
            updateCart();
        }
    }
}

// Mostrar productos al cargar la página
displayProducts();

// Función para mostrar y ocultar el carrito
document.getElementById('cart-toggle').addEventListener('click', function() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';

    // Ajustar posición si es necesario
    const rect = cartDropdown.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // Si el menú se sale de la pantalla, ajustarlo
    if (rect.right > windowWidth) {
        cartDropdown.style.right = `${windowWidth - rect.width}px`;
    } else {
        cartDropdown.style.right = '0'; // Asegúrate de que esté alineado a la derecha
    }
});

// Cerrar el carrito al hacer clic en la "X"
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-dropdown').style.display = 'none';
});