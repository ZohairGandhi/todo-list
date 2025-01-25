import listBox from "../icons/list-box-outline.svg";

export default class UI {
  static setUpFilterSec(app) {
    const todayFilt = document.querySelector("#today-filter");
    const weekFilt = document.querySelector("#week-filter");
    const compFilt = document.querySelector("#comp-filter");

    todayFilt.addEventListener("click", () =>
      this.renderTodayTasks(app, "Today"),
    );
    weekFilt.addEventListener("click", () =>
      this.renderTodayTasks(app, "This Week"),
    );
    compFilt.addEventListener("click", () =>
      this.renderTodayTasks(app, "Completed"),
    );
  }

  static renderTodayTasks(app, filterType) {
    const taskList = document.querySelector("#task-list");
    const head = this.createHeading("h1", "head", filterType);
    const div = this.createDiv("flex-list", "task-items");

    let tasks;
    if (filterType === "Completed") {
      tasks = app.filterCompleted();
    } else {
      tasks = app.filterByDueDate(filterType);
    }

    tasks.forEach((task) => {
      const taskItem = this.createTaskItem(task.title, task.isCompleted);
      div.appendChild(taskItem);
    });

    taskList.innerHTML = "";
    taskList.append(head, div);
  }

  static createHeading(headType, className, text) {
    const head = document.createElement(headType);
    head.classList.add(className);
    head.textContent = text;
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

  static renderProjSec(app) {
    const projSec = document.querySelector("#proj-sec");

    app.projectList.forEach((proj) => {
      const projItem = this.createProjItem(proj.title);
      projSec.appendChild(projItem);
    });
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

  static createPara(text) {
    const para = document.createElement("p");
    para.textContent = text;
    return para;
  }
}
