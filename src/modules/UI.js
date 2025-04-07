import listBox from "../icons/list-box-outline.svg";
import flag from "../icons/flag.svg";
import { format } from "date-fns";

export default class UI {
  static setUpFilterSec(app) {
    const todayFilt = document.querySelector("#today-filter");
    const weekFilt = document.querySelector("#week-filter");
    const compFilt = document.querySelector("#comp-filter");

    todayFilt.addEventListener("click", () => {
      this.renderTasks(app, "Today");
      document.querySelector("#task-desc").innerHTML = "";
    });
    weekFilt.addEventListener("click", () => {
      this.renderTasks(app, "This Week");
      document.querySelector("#task-desc").innerHTML = "";
    });
    compFilt.addEventListener("click", () => {
      this.renderTasks(app, "Completed");
      document.querySelector("#task-desc").innerHTML = "";
    });
  }

  static renderProjSec(app) {
    const projSec = document.querySelector("#proj-sec");
    const titleContainer = this.createDiv(null, "proj-sec-title-container");
    const title = this.createPara("Projects", "proj-sec-title");
    const btn = this.createBtn("add-proj-btn", "+");
    const addProjDialog = document.querySelector("dialog");

    btn.addEventListener("click", () => addProjDialog.showModal());

    projSec.innerHTML = "";
    titleContainer.append(title, btn);
    projSec.appendChild(titleContainer);

    app.projectList.forEach((proj) => {
      const projItem = this.createProjItem(proj.title);
      projItem.addEventListener("click", () => {
        this.renderTasks(app, proj.title);
        document.querySelector("#task-desc").innerHTML = "";
      });
      projSec.appendChild(projItem);
    });
  }

  static setUpProjDialog(app) {
    const dialog = document.querySelector("#proj-dialog");
    const cancelBtn = document.querySelector(
      "#proj-dialog .btn-container button:first-child",
    );
    const addBtn = document.querySelector(
      "#proj-dialog .btn-container button:nth-child(2)",
    );

    cancelBtn.addEventListener("click", () => {
      const textField = document.querySelector(
        "#proj-dialog .dialog-container input",
      );
      textField.value = "";
      dialog.close();
    });

    addBtn.addEventListener("click", () => {
      const textField = document.querySelector(
        "#proj-dialog .dialog-container input",
      );

      if (textField.value === "") {
        alert("Please enter a project title!");
        return;
      }

      if (app.getProject(textField.value) !== undefined) {
        alert("Project already exists!");
        textField.value = "";
        return;
      }

      app.addProject(textField.value);
      this.renderProjSec(app);
      textField.value = "";
      dialog.close();
    });
  }

  static setUpTaskDialog(app) {
    const dialog = document.querySelector("#task-dialog");
    const dateInput = document.querySelector(".date-priority-pair input");
    const cancelBtn = document.querySelector(
      "#task-dialog .btn-container button:first-child",
    );
    const addBtn = document.querySelector(
      "#task-dialog .btn-container button:nth-child(2)",
    );

    dateInput.setAttribute("min", format(new Date(), "yyyy-MM-dd"));
    dateInput.setAttribute("value", format(new Date(), "yyyy-MM-dd"));

    cancelBtn.addEventListener("click", () => {
      document.querySelector("form.dialog-container").reset();
      dialog.close();
    });

    addBtn.addEventListener("click", () => {
      const projTitle = document.querySelector("#task-list h1");
      const titleInput = document.querySelector(
        "#task-dialog .dialog-container input",
      );
      const descInput = document.querySelector(
        "#task-dialog .dialog-container textarea",
      );
      const dateInput = document.querySelector(
        "#task-dialog .date-priority-pair input",
      );
      const priorityInput = document.querySelector(
        "#task-dialog .date-priority-pair select",
      );

      if (titleInput.value === "" || dateInput.value === "") {
        alert("Please enter a task title & due date!");
        return;
      }

      if (
        app.getTaskFromProj(projTitle.textContent, titleInput.value) !==
        undefined
      ) {
        alert("Task already exists!");
        document.querySelector("form.dialog-container").reset();
        return;
      }

      app.addTaskToProj(
        projTitle.textContent,
        titleInput.value,
        descInput.value,
        new Date(dateInput.value),
        priorityInput.value,
      );

      this.renderTasks(app, projTitle.textContent);
      this.renderTaskDesc(
        app,
        projTitle.textContent,
        app.getTaskFromProj(projTitle.textContent, titleInput.value),
      );
      document.querySelector("form.dialog-container").reset();

      dialog.close();
    });
  }

  static setUpEditTaskDialog(app) {
    const dialog = document.querySelector("#edit-task-dialog");
    const dateInput = document.querySelector(".date-priority-pair input");
    const cancelBtn = document.querySelector(
      "#edit-task-dialog .btn-container button:first-child",
    );
    const addBtn = document.querySelector(
      "#edit-task-dialog .btn-container button:nth-child(2)",
    );

    dateInput.setAttribute("min", format(new Date(), "yyyy-MM-dd"));
    dateInput.setAttribute("value", format(new Date(), "yyyy-MM-dd"));

    cancelBtn.addEventListener("click", () => {
      document.querySelector("form.dialog-container").reset();
      dialog.close();
    });

    addBtn.addEventListener("click", () => {
      const filterType = document.querySelector("#task-list h1").textContent;
      const projTitle =
        document.querySelector("#task-desc-head").dataset.projTitle;
      const titleInput = document.querySelector(
        "#edit-task-dialog .dialog-container input",
      );
      const descInput = document.querySelector(
        "#edit-task-dialog .dialog-container textarea",
      );
      const dateInput = document.querySelector(
        "#edit-task-dialog .date-priority-pair input",
      );
      const priorityInput = document.querySelector(
        "#edit-task-dialog .date-priority-pair select",
      );

      if (titleInput.value === "" || dateInput.value === "") {
        alert("Please enter a task title & due date!");
        return;
      }

      const match = app.getTaskFromProj(projTitle, titleInput.value);
      const origTitle = document.querySelector("#task-desc-head").textContent;

      if (match !== undefined && match.title !== origTitle) {
        alert("Task already exists!");
        document.querySelector("form.dialog-container").reset();
        return;
      }

      const origTask = app.getTaskFromProj(projTitle, origTitle);

      origTask.title = titleInput.value;
      origTask.desc = descInput.value;
      origTask.dueDate = new Date(dateInput.value);
      origTask.priority = priorityInput.value;

      this.renderTasks(app, filterType);
      this.renderTaskDesc(
        app,
        projTitle,
        app.getTaskFromProj(projTitle, titleInput.value),
        ["Completed", "Today", "This Week"].includes(filterType)
          ? filterType
          : null,
      );
      document.querySelector("form.dialog-container").reset();

      dialog.close();
    });
  }

  static renderTasks(app, filterType) {
    const taskList = document.querySelector("#task-list");
    const head = this.createHeading("h1", "head", filterType);
    const div = this.createDiv("flex-list", "task-items");

    let tasks;
    if (filterType === "Completed") {
      tasks = app.filterCompleted();
    } else if (filterType === "Today" || filterType === "This Week") {
      tasks = app.filterByDueDate(filterType);
    } else {
      tasks = app.getProject(filterType).taskList;
    }

    if (["Completed", "Today", "This Week"].includes(filterType)) {
      tasks.forEach(({ proj, task }) => {
        const taskItem = this.createTaskItem(task, proj.title);

        taskItem.addEventListener("click", () =>
          this.renderTaskDesc(app, proj.title, task, filterType),
        );

        div.appendChild(taskItem);
      });
    } else {
      tasks.forEach((task) => {
        const taskItem = this.createTaskItem(task);

        taskItem.addEventListener("click", () =>
          this.renderTaskDesc(app, filterType, task),
        );

        div.appendChild(taskItem);
      });
    }

    taskList.innerHTML = "";

    if (["Completed", "Today", "This Week"].includes(filterType)) {
      taskList.append(head, div);
    } else {
      const addBtn = this.createBtn("add-task-btn", "+ Add Task");
      const delBtn = this.createBtn("del-proj-btn", "Delete Project");
      const taskDialog = document.querySelector("#task-dialog");

      addBtn.addEventListener("click", () => taskDialog.showModal());

      delBtn.addEventListener("click", () => {
        app.removeProject(filterType);
        this.renderProjSec(app);
        taskList.innerHTML = "";
        document.querySelector("#task-desc").innerHTML = "";
      });

      taskList.append(head, addBtn, div, delBtn);
    }
  }

  static renderTaskDesc(app, projTitle, task, filterType = null) {
    const taskDescSec = document.querySelector("#task-desc");

    const datePriorSec = this.createDiv(null, "date-priority-sec");
    const date = this.createPara(task.getFormattedDate());
    const img = this.createImg(flag);
    datePriorSec.append(date, img);

    const taskTitle = this.createHeading(
      "h1",
      "head",
      task.title,
      "task-desc-head",
    );
    taskTitle.dataset.projTitle = projTitle;
    const taskDesc = this.createPara(task.desc, "task-desc-txt");

    const btnContainer = this.createDiv(null, "task-btns-container");
    const editBtn = this.createBtn("edit-task-btn", "Edit");
    const delBtn = this.createBtn("del-task-btn", "Delete");

    editBtn.addEventListener("click", () => {
      const dialog = document.querySelector("#edit-task-dialog");
      const titleInput = document.querySelector(
        "#edit-task-dialog .dialog-container input",
      );
      const descInput = document.querySelector(
        "#edit-task-dialog .dialog-container textarea",
      );
      const dateInput = document.querySelector(
        "#edit-task-dialog .date-priority-pair input",
      );
      const priorityInput = document.querySelector(
        "#edit-task-dialog .date-priority-pair select",
      );

      titleInput.value = task.title;
      descInput.value = task.desc;
      dateInput.value = format(task.dueDate, "yyyy-MM-dd");
      priorityInput.value = task.priority;

      dialog.showModal();
    });

    delBtn.addEventListener("click", () => {
      app.removeTaskFromProj(projTitle, task.title);
      if (filterType) {
        this.renderTasks(app, filterType);
      } else {
        this.renderTasks(app, projTitle);
      }
      taskDescSec.innerHTML = "";
    });

    btnContainer.append(editBtn, delBtn);

    taskDescSec.innerHTML = "";
    taskDescSec.append(datePriorSec, taskTitle, taskDesc, btnContainer);
  }

  static createHeading(headType, className, text, idName = null) {
    const head = document.createElement(headType);
    head.classList.add(className);
    head.textContent = text;
    if (idName) {
      head.setAttribute("id", idName);
    }
    return head;
  }

  static createTaskItem(task, projTitle = null) {
    const div = this.createDiv("container", null);
    const chBox = document.createElement("input");
    chBox.setAttribute("type", "checkbox");
    chBox.checked = task.isCompleted;

    chBox.addEventListener("click", () => {
      task.isCompleted = chBox.checked;
    });

    const lbl = document.createElement("label");
    lbl.textContent = projTitle ? `${task.title} (${projTitle})` : task.title;
    div.append(chBox, lbl);
    return div;
  }

  static createBtn(idName, text) {
    const btn = document.createElement("button");
    btn.setAttribute("id", idName);
    btn.textContent = text;
    return btn;
  }

  static createProjItem(projTitle) {
    const div = this.createDiv("list-item", null);
    const img = this.createImg(listBox);
    const para = this.createPara(projTitle);

    div.append(img, para);
    return div;
  }

  static createDiv(className = null, idName = null) {
    const div = document.createElement("div");

    if (className) {
      div.classList.add(className);
    }
    if (idName) {
      div.setAttribute("id", idName);
    }

    return div;
  }

  static createImg(source) {
    const img = document.createElement("img");
    img.setAttribute("src", source);
    return img;
  }

  static createPara(text, idName = null) {
    const para = document.createElement("p");
    para.textContent = text;
    if (idName) {
      para.setAttribute("id", idName);
    }
    return para;
  }
}
