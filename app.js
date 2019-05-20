// Product Constructor
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// UI Constructor
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong class="ml-2">Product</strong>: ${product.name} -
                    <strong>Price</strong>: ${product.price} - 
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete"><i class="fas fa-trash-alt"></i></a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado exitosamente', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in The DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        // Insert Message in the UI
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
document.getElementById('product-form').addEventListener('submit', (e)=> {

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    // Create a new Oject Product
    const product = new Product(name, price, year);

    // Create a new UI
    const ui = new UI();

    // Input User Validation
    if (name === '' || price === '' || year === '') {
        ui.showMessage('Por favor inserte todos los datos', 'danger');
    }else{
        // Save Product
        ui.addProduct(product);
        ui.showMessage('Producto Agregado con exito', 'info');
        ui.resetForm();
    }
    e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', (e)=> {
    const ui = new UI();
    ui.deleteProduct(e.target);
    e.preventDefault();
});