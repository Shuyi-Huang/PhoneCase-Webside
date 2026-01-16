//Sidebar functions
closeCart();
function openCart() {
    document.getElementById("cart-sidebar").style.width = "30vw";
}

function closeCart() {
    document.getElementById("cart-sidebar").style.width = "0";
}

// Show JSON cart list
function displayCartData() {
     fetch('cart.json')
        .then(response => response.json())
        .then(data => {
            // loop for each item in the cart
            data.cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = "Item: " + item.product + ", Price: " + item.price + ", Quantity: " + item.quantity;
                document.getElementById('cart-list').appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }