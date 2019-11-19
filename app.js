class Item {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }
}

class UI {
  addItemToList(item) {
    const list = document.getElementById('to-do-list');
    //Create new row and append to table of items
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.name}</td>
      <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }

  showMessage(message, className){
    // Create message div and place above the form
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#form');
    container.insertBefore(div, form);

    // Remove message after 3 seconds
    setTimeout(function(){
      document.querySelector('.message').remove();
    }, 3000);
  }

  deleteItem(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    };
  };

  clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
  };
}

//Event Listeners

// Add item
  document.getElementById('form').addEventListener('submit', function(e){
    const name = document.getElementById('name').value,
          quantity = document.getElementById('quantity').value

    const item = new Item(name, quantity);

    const ui = new UI();

    //Validate
    if (name === '' || quantity === '' ){
      ui.showMessage('Please fill in all fields', 'error');
    } else {
      ui.addItemToList(item);

      ui.showMessage('Item successufully added', 'success');

      ui.clearFields();
    }

    e.preventDefault();
  });

// Delete item
  document.getElementById('to-do-list').addEventListener('click', function(e){

    const ui = new UI();

    ui.deleteItem(e.target);

    ui.showMessage('Item Removed', 'success');

    e.preventDefault();
  });
