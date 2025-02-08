import listBox from "../icons/list-box-outline.svg";

export default class UI {
  static setUpFilterSec(app) {
    const todayFilt = document.querySelector("#today-filter");
    const weekFilt = document.querySelector("#week-filter");
    const compFilt = document.querySelector("#comp-filter");

    todayFilt.addEventListener("click", () => this.renderTasks(app, "Today"));
    weekFilt.addEventListener("click", () =>
      this.renderTasks(app, "This Week"),
    );
    compFilt.addEventListener("click", () =>
      this.renderTasks(app, "Completed"),
    );
  }

  static renderProjSec(app) {
    const projSec = document.querySelector("#proj-sec");

    app.projectList.forEach((proj) => {
      const projItem = this.createProjItem(proj.title);
      projItem.addEventListener("click", () =>
        this.renderTasks(app, proj.title),
      );
      projSec.appendChild(projItem);
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

    tasks.forEach((task) => {
      const taskItem = this.createTaskItem(task.title, task.isCompleted);
      div.appendChild(taskItem);
    });

    taskList.innerHTML = "";

    if (["Completed", "Today", "This Week"].includes(filterType)) {
      taskList.append(head, div);
    } else {
      const addBtn = this.createBtn("add-task-btn", "+ Add Task");
      const delBtn = this.createBtn("del-proj-btn", "Delete Project");
      taskList.append(head, addBtn, div, delBtn);
    }
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

  static createTaskItem(taskTitle, isCompleted) {
    const div = this.createDiv("container", null);
    const chBox = document.createElement("input");
    chBox.setAttribute("type", "checkbox");
    chBox.checked = isCompleted;
    const lbl = document.createElement("label");
    lbl.textContent = taskTitle;
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
