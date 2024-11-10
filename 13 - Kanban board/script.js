// เลือก elements
const dragItems = document.querySelectorAll('.drag-item'); // เลือกทุก element ที่มี class เป็น 'drag-item'
const dragLists = document.querySelectorAll('.drag-item-list'); // เลือกทุก element ที่มี class เป็น 'drag-item-list'

// เพิ่ม event listeners สำหรับ drag items
dragItems.forEach(item => { // สำหรับแต่ละ item ใน dragItems
    item.addEventListener('dragstart', dragStart); // เพิ่ม listener สำหรับเหตุการณ์ dragstart
    item.addEventListener('dragend', dragEnd); // เพิ่ม listener สำหรับเหตุการณ์ dragend
});

// เพิ่ม event listeners สำหรับ drop targets
dragLists.forEach(list => { // สำหรับแต่ละ list ใน dragLists
    list.addEventListener('dragover', dragOver); // เพิ่ม listener สำหรับเหตุการณ์ dragover
    list.addEventListener('drop', drop); // เพิ่ม listener สำหรับเหตุการณ์ drop
});

// ฟังก์ชันสำหรับการลาก
function dragStart() { // ฟังก์ชันที่เรียกเมื่อเริ่มลาก
    this.classList.add('dragging'); // เพิ่ม class 'dragging' ให้กับ element ที่ถูกลาก
}

function dragEnd() { // ฟังก์ชันที่เรียกเมื่อการลากสิ้นสุด
    this.classList.remove('dragging'); // ลบ class 'dragging' ออกจาก element ที่ถูกลาก
}

function dragOver(e) { // ฟังก์ชันที่เรียกเมื่อมีการลากเหนือ element
    e.preventDefault(); // ป้องกันการกระทำเริ่มต้นของ browser
    const afterElement = getDragAfterElement(this, e.clientY); // หา element ที่จะวางหลังจาก element ปัจจุบัน
    const draggable = document.querySelector('.dragging'); // เลือก element ที่กำลังถูกลาก
    if (afterElement == null) { // ถ้าไม่มี element ที่จะวางหลัง
        this.appendChild(draggable); // วาง draggable ไว้ที่ element ปัจจุบัน
    } else {
        this.insertBefore(draggable, afterElement); // วาง draggable ก่อน element ที่จะวางหลัง
    }
}

function drop(e) { // ฟังก์ชันที่เรียกเมื่อมีการปล่อย element
    e.preventDefault(); // ป้องกันการกระทำเริ่มต้นของ browser
}

function getDragAfterElement(container, y) { // ฟังก์ชันเพื่อหา element ที่จะวางหลังจากการลาก
    const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')]; // เลือกทุก element ที่ไม่กำลังถูกลาก

    return draggableElements.reduce((closest, child) => { // ใช้ reduce เพื่อหา element ที่ใกล้ที่สุด
        const box = child.getBoundingClientRect(); // รับตำแหน่งของ child
        const offset = y - box.top - box.height / 2; // คำนวณ offset
        if (offset < 0 && offset > closest.offset) { // ถ้า offset อยู่ในช่วงที่กำหนด
            return { offset: offset, element: child }; // คืนค่า offset และ element
        } else {
            return closest; // คืนค่า closest ถ้าไม่ตรงเงื่อนไข
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element; // เริ่มต้นด้วย offset ที่ต่ำสุด
}

// ฟังก์ชันสำหรับ modal
const modal = document.getElementById("addItemModal"); // เลือก modal โดยใช้ ID
const addNewItemBtn = document.getElementById("addNewItemBtn"); // เลือกปุ่มเพิ่ม item ใหม่
const closeBtn = document.querySelector(".close"); // เลือกปุ่มปิด modal
const addItemButton = document.getElementById("addItemButton"); // เลือกปุ่มเพิ่ม item
const newItemInput = document.getElementById("newItemInput"); // เลือก input สำหรับเพิ่ม item ใหม่

addNewItemBtn.onclick = () => modal.style.display = "block"; // แสดง modal เมื่อคลิกปุ่มเพิ่ม item ใหม่
closeBtn.onclick = () => modal.style.display = "none"; // ปิด modal เมื่อคลิกปุ่มปิด
window.onclick = (event) => { // เมื่อคลิกที่หน้าต่าง
    if (event.target == modal) { // ถ้าคลิกที่ modal
        modal.style.display = "none"; // ปิด modal
    }
};

addItemButton.addEventListener('click', addNewItem); // เพิ่ม listener สำหรับปุ่มเพิ่ม item
newItemInput.addEventListener('keyup', (event) => { // เพิ่ม listener สำหรับ input เมื่อมีการกดปุ่ม
    if (event.key === 'Enter') { // ถ้ากดปุ่ม Enter
        addNewItem(); // เรียกฟังก์ชันเพิ่ม item ใหม่
    }
});

function addNewItem() { // ฟังก์ชันสำหรับเพิ่ม item ใหม่
    const newItemText = newItemInput.value.trim(); // รับค่าจาก input และตัดช่องว่าง
    if (newItemText !== "") { // ถ้าค่าที่รับไม่ว่าง
        const newItem = document.createElement('li'); // สร้าง element ใหม่เป็น li
        newItem.className = 'drag-item'; // ตั้ง class ให้กับ item ใหม่
        newItem.draggable = true; // ทำให้ item ใหม่สามารถลากได้
        newItem.textContent = newItemText; // ตั้งค่าข้อความให้กับ item ใหม่
        newItem.addEventListener('dragstart', dragStart); // เพิ่ม listener สำหรับ dragstart
        newItem.addEventListener('dragend', dragEnd); // เพิ่ม listener สำหรับ dragend
        
        document.querySelector('#backlog-content').appendChild(newItem); // เพิ่ม item ใหม่ไปยัง backlog
        modal.style.display = "none"; // ปิด modal
        newItemInput.value = ""; // เคลียร์ input
    }
}

// เพิ่มเหตุผลด้วยการดับเบิลคลิก
document.addEventListener('dblclick', (e) => { // เพิ่ม listener สำหรับเหตุการณ์ดับเบิลคลิก
    if (e.target.classList.contains('drag-item')) { // ถ้าคลิกที่ element ที่มี class 'drag-item'
        const reason = prompt("เพิ่มเหตุผลหรือหมายเหตุ:"); // แสดง prompt เพื่อรับเหตุผล
        if (reason !== null && reason.trim() !== "") { // ถ้าผู้ใช้กรอกเหตุผล
            let reasonElement = e.target.querySelector('.drag-item-reason'); // ค้นหา element สำหรับเหตุผล
            if (!reasonElement) { // ถ้ายังไม่มี element สำหรับเหตุผล
                reasonElement = document.createElement('div'); // สร้าง element ใหม่เป็น div
                reasonElement.className = 'drag-item-reason'; // ตั้ง class ให้กับ element เหตุผล
                e.target.appendChild(reasonElement); // เพิ่ม element เหตุผลเข้าไปใน item
            }
            reasonElement.textContent = reason; // ตั้งค่าข้อความให้กับ element เหตุผล
        }
    }
});