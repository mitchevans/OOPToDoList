class Item {
  constructor(name, quantity, id) {
    this.name = name;
    this.quantity = quantity;
    this.id = id;
  }
}

class UI {
  addItemToList(item) {
    const list = document.getElementById('to-do-list');
    
    //Create new row and append to table of items
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td><a href="#" class="delete" id="${item.id}">X</a></td>`;
    list.appendChild(row);
  }

  CreateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
      const ui = new UI;
      ui.showMessage('Item Removed', 'success');
    };
  };

  clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
  };
}

// Local Storage
class Store {
  static getItems() {
    let items;
    if(localStorage.getItem('items') === null){
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
    return items
  };

  static displayItems() {
    const items = Store.getItems();

    items.forEach(function(item) {
      const ui = new UI;

      ui.addItemToList(item);
    });
  };

  static addItem(item) {
    const items = Store.getItems();
     
    items.push(item);

    localStorage.setItem('items', JSON.stringify(items));
  };

  static removeItem(id) {
    const items = Store.getItems();

    items.forEach(function(item, index){
      if(item.id === id){
        items.splice(index, 1)
      }
    });
    localStorage.setItem('items', JSON.stringify(items));
  };

}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayItems);

//Event Listeners

// Add item
  document.getElementById('form').addEventListener('submit', function(e){
    const name = document.getElementById('name').value,
          quantity = document.getElementById('quantity').value

    

    const ui = new UI();

    const id = ui.CreateUUID()
    const item = new Item(name, quantity, id);
    //Validate
    if (name === '' || quantity === '' ){
      ui.showMessage('Please fill in all fields', 'error');
    } else {
      // Add item to list
      ui.addItemToList(item);

      // Add item to LS
      Store.addItem(item);

      ui.showMessage('Item successufully added', 'success');

      ui.clearFields();
    }

    e.preventDefault();
  });

// Delete item
  document.getElementById('to-do-list').addEventListener('click', function(e){

    const ui = new UI();

    ui.deleteItem(e.target);

    Store.removeItem(e.target.id)
    

    e.preventDefault();
  });
