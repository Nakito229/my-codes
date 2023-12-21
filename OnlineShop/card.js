// function Filter(category) {
//     currentFilter = category;

//     let buttons = document.getElementsByClassName('category');
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].classList.remove('active');
//     }

//     document.getElementById(category).classList.add('active');

//     let productCards = document.getElementsByClassName('product-card');

//     for (let i = 0; i < productCards.length; i++) {
//         let product = productCards[i];
//         let productId = product.getAttribute('data-id');

//         if (category === 'All' || productMatchesCategory(productId, category)) {
//             product.style.display = 'block';
//         } else {
//             product.style.display = 'none';
//         }
//     }
// }

// function productMatchesCategory(ProductsId, category) {
//     return ProductsId.startsWith(category);
// }

$('.category').click(function () {
    let category = $(this).text().toLowerCase();
    $('.product-card').each(function () {
        if ($(this).hasClass(category) || category === 'all') {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});



function fetchData() {
    fetch('https://6579a18b1acd268f9af98e2b.mockapi.io/Online/Shop/Products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const apiDataContainer = document.getElementById('CardsContainer');

            const htmlContent = data.map(element => {
                return `<div class="product-card ${element.id}">
                            <img src="${element.image}">
                            <p class="ProductName">${element.name}</p>
                            <p>${element.price}$</p>
                            <button onclick="myCart(this)">add to cart</button>
                        </div>`;
            }).join('');

            apiDataContainer.innerHTML = htmlContent;
            Filter(currentFilter);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

window.onload = function () {
    fetchData();
};

let openShopping = document.querySelector('.Cart');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});


async function addToCart(Products) {
    const Url = 'https://6579a18b1acd268f9af98e2b.mockapi.io/Online/Shop/Cart';

    try {
        const response = await fetch(Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Products)
        });

        if (!response.ok) {
            console.log('response error');
        }

        const data = await response.json();
        console.log(data);

        const cartItems = document.getElementsByClassName('listCard')[0];
        const cartItemHtml = `<div class="cardItem" id="${Products.id}">
                                <img src="${Products.image}">
                                <span class="info">
                                <p>${Products.name}</p>
                                <p>${Products.price}</p>
                                <button onclick="deleteproduct('${Products.id}')">Delete</button>
                                </span>
                            </div>`;
        cartItems.innerHTML += cartItemHtml;
    } catch (error) {
        console.log(error);
    }
}

function deleteproduct(ProductsId) {
    const cartItem = document.getElementById(ProductsId);
    if (cartItem) {
        cartItem.remove();
    }
}

let myCart = (myBtn) => {
    const children = myBtn.parentElement.children;

    let cartProducts = {
        id: Date.now(),
        image: children[0].src,
        name: children[1].innerText,
        price: children[2].innerText,
    }

    addToCart(cartProducts);
}



