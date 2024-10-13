// เลือก elements
const dragItems = document.querySelectorAll('.drag-item');
const dragLists = document.querySelectorAll('.drag-item-list');

// เพิ่ม event listeners สำหรับ drag items
dragItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// เพิ่ม event listeners สำหรับ drop targets
dragLists.forEach(list => {
    list.addEventListener('dragover', dragOver);
    list.addEventListener('drop', drop);
});

// Drag functions
function dragStart() {
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(this, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        this.appendChild(draggable);
    } else {
        this.insertBefore(draggable, afterElement);
    }
}

function drop(e) {
    e.preventDefault();
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Modal functionality
const modal = document.getElementById("addItemModal");
const addNewItemBtn = document.getElementById("addNewItemBtn");
const closeBtn = document.querySelector(".close");
const addItemButton = document.getElementById("addItemButton");
const newItemInput = document.getElementById("newItemInput");

addNewItemBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

addItemButton.addEventListener('click', addNewItem);
newItemInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addNewItem();
    }
});

function addNewItem() {
    const newItemText = newItemInput.value.trim();
    if (newItemText !== "") {
        const newItem = document.createElement('li');
        newItem.className = 'drag-item';
        newItem.draggable = true;
        newItem.textContent = newItemText;
        newItem.addEventListener('dragstart', dragStart);
        newItem.addEventListener('dragend', dragEnd);
        
        document.querySelector('#backlog-content').appendChild(newItem);
        modal.style.display = "none";
        newItemInput.value = "";
    }
}

// Double-click to add reason
document.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('drag-item')) {
        const reason = prompt("เพิ่มเหตุผลหรือหมายเหตุ:");
        if (reason !== null && reason.trim() !== "") {
            let reasonElement = e.target.querySelector('.drag-item-reason');
            if (!reasonElement) {
                reasonElement = document.createElement('div');
                reasonElement.className = 'drag-item-reason';
                e.target.appendChild(reasonElement);
            }
            reasonElement.textContent = reason;
        }
    }
});