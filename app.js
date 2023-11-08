document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".add-task-form");
    const input = document.querySelector(".add-task-input");
    const select = document.querySelector(".filter-tasks");
    const taskList = document.querySelector(".task-list");
    const searchInput = document.getElementById("search");

    
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function(taskText) {
        createTask(taskText);
        // console.log(savedTasks)
    });
  
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (input.value.trim() !== "") {
            const taskText = input.value;
            createTask(taskText);
            input.value = "";
        }
    });
  

    function createTask(taskText) {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";

        const trashIcon = document.createElement("i");
        trashIcon.className = "fas fa-trash-alt trash-icon";

        trashIcon.addEventListener("click", function() {
            taskItem.remove();
            saveTasksToLocalStorage();
        });

        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskText;

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit-input";
        editInput.style.display = "none";

        const editButton = document.createElement("button");
       editButton.textContent = "Edit";
editButton.className = "edit-button";
let isEditing = false;

editButton.addEventListener("click", function () {
    if (!isEditing) {
        
        isEditing = true;
        editInput.style.display = "block";
        taskTextElement.style.display = "none";
        editInput.value = taskTextElement.textContent;
        editInput.focus();
        editButton.textContent = "Save";
    } else {
        
        isEditing = false;
        const editedText = editInput.value.trim();
        if (editedText !== "") {
            taskTextElement.textContent = editedText;
        }
        editInput.style.display = "none";
        taskTextElement.style.display = "block";
        editButton.textContent = "Edit";
        saveTasksToLocalStorage();
    }

        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(trashIcon);
        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(editInput);
        taskItem.appendChild(editButton);


        taskList.appendChild(taskItem);
        saveTasksToLocalStorage();
    }


    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll(".task-item");
        taskItems.forEach(function (taskItem) {
            tasks.push(taskItem.querySelector("span").textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    taskList.addEventListener("change", function (e) {
        if (e.target.type === "checkbox") {
            const taskItem = e.target.parentElement;
            taskItem.classList.toggle("completed", e.target.checked);
        }
    });
    

    select.addEventListener("change", function () {
        const selectedValue = select.value;
        const taskItems = taskList.children;
    
        Array.from(taskItems).forEach(function (taskItem) {
            const isCompleted = taskItem.classList.contains("completed");
            const Filter = (selectedValue === "all") ||
                                 (selectedValue === "completed" && isCompleted) ||
                                 (selectedValue === "incompleted" && !isCompleted);
    
            taskItem.style.display = Filter ? "block" : "none";
        });
    });
    
    


    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const taskItems = taskList.querySelectorAll(".task-item");

        taskItems.forEach(function (taskItem) {
            const taskText = taskItem.querySelector("span").textContent.toLowerCase();
            if (taskText.includes(searchTerm)) {
                taskItem.style.display = "block";
            } else {
                taskItem.style.display = "none";
            }
        });
    });
});



