document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.addproductform');

    document.querySelector('.clean').addEventListener('click', function() {
        form.reset();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const productName = formData.get('name');
        const productPrice = parseFloat(formData.get('price')); 
        const img = formData.get('image');

        fetch('https://json-api-delta.vercel.app/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: productName, price: productPrice, image: img })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Producto agregado:', data);
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            location.reload();
        });
    });

    const productList = document.querySelector('.productList');

    fetch('https://json-api-delta.vercel.app/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const item = document.createElement('li');
                item.classList.add('item');
                item.innerHTML = `
                    <img src="${product.image}" alt="">
                    <p class="item_title">${product.name}</p>
                    <p class="item_price">Precio: $${product.price}</p>
                    <button class="delete_item" data-id="${product.id}" >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="30px" viewBox="0,0,256,256"
                    style="fill:#ffffff;">
                    <g fill="#fffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M28,6c-2.209,0 -4,1.791 -4,4v2h-0.40039l-13.59961,2v3h44v-3l-13.59961,-2h-0.40039v-2c0,-2.209 -1.791,-4 -4,-4zM28,10h8v2h-8zM12,19l2.70117,33.32227c0.168,2.077 1.90428,3.67773 3.98828,3.67773h26.62305c2.084,0 3.81733,-1.59878 3.98633,-3.67578l2.625,-32.32422zM20,26c1.105,0 2,0.895 2,2v23h-3l-1,-23c0,-1.105 0.895,-2 2,-2zM32,26c1.657,0 3,1.343 3,3v22h-6v-22c0,-1.657 1.343,-3 3,-3zM44,26c1.105,0 2,0.895 2,2l-1,23h-3v-23c0,-1.105 0.895,-2 2,-2z"></path></g></g>
                    </svg>
                    </button>
                `;
                productList.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

    productList.addEventListener('click', function(event) {
        if (event.target.closest('.delete_item')) {
            const productId = event.target.closest('.delete_item').getAttribute('data-id');
            fetch(`https://json-api-delta.vercel.app/products/${productId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log('Producto eliminado:', data);
                event.target.parentElement.remove();
                location.reload();
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
                location.reload();
            });
        }
    });
});
