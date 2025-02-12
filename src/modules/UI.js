import listBox from "../icons/list-box-outline.svg";
import flag from "../icons/flag.svg";

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
        const taskItem = this.createTaskItem(task);

        taskItem.addEventListener("click", () =>
          this.renderTaskDesc(app, filterType, task),
        );

      div.appendChild(taskItem);
    });

    taskList.innerHTML = "";

    if (["Completed", "Today", "This Week"].includes(filterType)) {
      taskList.append(head, div);
    } else {
      const addBtn = this.createBtn("add-task-btn", "+ Add Task");
      const delBtn = this.createBtn("del-proj-btn", "Delete Project");

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
    const taskDesc = this.createPara(task.desc, "task-desc-txt");

    const btnContainer = this.createDiv(null, "task-btns-container");
    const editBtn = this.createBtn("edit-task-btn", "Edit");
    const delBtn = this.createBtn("del-task-btn", "Delete");

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
    lbl.textContent = `${task.title} (${projTitle})`;
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
