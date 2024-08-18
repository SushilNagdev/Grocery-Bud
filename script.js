document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemText = itemInput.value.trim();

    if (itemText === '') {
        alert('Please enter a grocery item.');
        return;
    }

    const groceryList = document.getElementById('groceryList');
    const listItem = document.createElement('li');

    listItem.textContent = itemText;
    addDeleteButton(listItem);
    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        saveItems();
    });

    groceryList.appendChild(listItem);
    itemInput.value = '';

    saveItems();
}

function addDeleteButton(listItem) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        listItem.remove();
        saveItems();
    });
    listItem.appendChild(deleteButton);
}

function saveItems() {
    const items = [];
    document.querySelectorAll('#groceryList li').forEach((item) => {
        items.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('groceryItems', JSON.stringify(items));
}

function loadItems() {
    const items = JSON.parse(localStorage.getItem('groceryItems')) || [];
    const groceryList = document.getElementById('groceryList');
    items.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.text;
        if (item.completed) {
            listItem.classList.add('completed');
        }
        addDeleteButton(listItem);
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            saveItems();
        });
        groceryList.appendChild(listItem);
    });
}
