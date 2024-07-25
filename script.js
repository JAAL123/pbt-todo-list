document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const form = document.getElementById("form");
    const taskInput = document.getElementById("task");
    const addBtn = document.getElementById("add");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const createTask = (task) => {
      if (!task) return;
      const li = document.createElement("li");
      const deleteBtn = document.createElement("button");
      const checkBtn = document.createElement("input");
      const p = document.createElement("p");
      li.id = String(task.id);
      li.className = "task";
      checkBtn.type = "checkbox";
      checkBtn.checked = task.done;
      checkBtn.setAttribute("title", "Completada");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.id = "delete";
      deleteBtn.className = "btn-delete";
      p.textContent = task.title;
      if (task.done) {
        p.className = "task-done";
      }
      taskList.appendChild(li);
      li.appendChild(p);
      li.appendChild(deleteBtn);
      li.appendChild(checkBtn);
    };

    form.addEventListener("submit", (e) => {
      if (!taskInput.value) return alert("Debe ingresar una tarea");
      tasks.push({ title: taskInput.value, done: false, id: Date.now() });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      createTask(taskInput.value);
      taskInput.value = "";
    });

    tasks.forEach((task) => createTask(task));

    taskList.addEventListener("click", (e) => {
      if (e.target.id === "delete") {
        const task = e.target.parentElement;
        const index = tasks.findIndex((t) => t.id === Number(task.id));
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        task.remove();
      }
    });

    taskList.addEventListener("click", (e) => {
      if (e.target.type === "checkbox") {
        const task = e.target.parentElement;
        const index = tasks.findIndex((t) => t.id === Number(task.id));
        tasks[index].done = e.target.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        task.querySelector("p").className = e.target.checked
          ? "task-done"
          : "";
      }
    });
  });