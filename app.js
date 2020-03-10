let form = document.getElementById('form');
let ul = document.getElementById('item-list');
let clearButton = document.getElementById('clear-task');
let filter = document.getElementById('filter');

class TASK {
    static addItem(e) {
        e.preventDefault();
        let inputVal = document.getElementById('input-task').value;
        // Appending to LocalStorage
        let itemList = TASK.getItemList();
        itemList.push(inputVal);
        localStorage.setItem("item-list", JSON.stringify(itemList));
        // Appending to UI list
        let newLi = document.createElement("li");
        let span = document.createElement('span')
        let link = document.createElement('a');
        link.className = 'delete-item';
        span.appendChild(document.createTextNode(inputVal));
        link.appendChild(document.createTextNode('X'));
        newLi.appendChild(span);
        newLi.appendChild(link);
        ul.appendChild(newLi);

    }
    // return ItemList from the LocalStorage
    static getItemList() {
        let itemList;
        if(localStorage.getItem('item-list') == null) {
            itemList = [];
        } else {
            itemList = JSON.parse(localStorage.getItem("item-list"));
        }
        return itemList;
    }
    // Showing all the items in UI List
    static showItemsInUI() {
        let itemList = TASK.getItemList();
        for(let i = 0; i < itemList.length; i++) {
            let li = document.createElement("li");
            let span = document.createElement('span')
            let link = document.createElement('a');
            link.className = 'delete-item';
            span.appendChild(document.createTextNode(itemList[i]));
            link.appendChild(document.createTextNode('X'));
            li.appendChild(span);
            li.appendChild(link);
            ul.appendChild(li);
        }
    }
    // Clearing all the items in LocalStorage
    static clearItems() {
        if(confirm('Do you really want to clear all?')) {
            alert('Cleared!');
            localStorage.clear();
            // Clearing from UI
            ul.textContent = "";
        }
    }

    static deleteAnItem(e) {
        if(e.target.classList.contains("delete-item")) {
            if(confirm('Do you want to delete this item?')) {
                let index = Array.from(ul.children).indexOf(e.target.parentElement);
                let itemList = TASK.getItemList();
                itemList.splice(index, 1);
                localStorage.setItem('item-list', JSON.stringify(itemList));
                ul.removeChild(e.target.parentElement);
            }
        }
    }
    // Filter an item
    static filterItem()  {
        let filterVal = document.getElementById('filter').value.toLowerCase().trim();
        // Loop through each li and find the match string or text
        // if the text is found, then li is displayed
        // else li is not displayed
        for(let i = 0; i < TASK.getItemList().length; i++) {
            let liValue = ul.children[i].innerText.toLowerCase();
            if(liValue.indexOf(filterVal) == -1) {
                ul.children[i].style.display = 'none';
            } else {
                ul.children[i].style.display = 'block';
            }
        }
    }
}

form.addEventListener('submit', TASK.addItem);
clearButton.addEventListener('click', TASK.clearItems);
ul.addEventListener('click', TASK.deleteAnItem);
filter.addEventListener('keydown', TASK.filterItem);
