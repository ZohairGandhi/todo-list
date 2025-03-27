import Project from "./Project";
import Task from "./Task.js";
import Storage from "./Storage";

export default class App {
  constructor() {
    this.projectList = [];
  }

  addProject(projTitle) {
    this.projectList.push(new Project(projTitle));
    Storage.saveData(this);
  }

  removeProject(projTitle) {
    this.projectList.splice(
      this.projectList.findIndex((proj) => proj.title === projTitle),
      1,
    );
    Storage.saveData(this);
  }

  getProject(projTitle) {
    return this.projectList.find((proj) => proj.title === projTitle);
  }

  addTaskToProj(projTitle, title, desc, dueDate, priority) {
    this.getProject(projTitle).addTask(
      new Task(title, desc, dueDate, priority),
    );
    Storage.saveData(this);
  }

  removeTaskFromProj(projTitle, taskTitle) {
    this.getProject(projTitle).removeTask(taskTitle);
    Storage.saveData(this);
  }

  getTaskFromProj(projTitle, taskTitle) {
    return this.getProject(projTitle).getTask(taskTitle);
  }

  filterByDueDate(dueDate) {
    const todayTasks = [];

    this.projectList.forEach((proj) => {
      proj.taskList.forEach((task) => {
        if (dueDate === "Today") {
          if (task.isDueToday()) {
            todayTasks.push({ proj, task });
          }
        } else {
          if (task.isDueThisWeek()) {
            todayTasks.push({ proj, task });
          }
        }
      });
    });

    return todayTasks;
  }

  filterCompleted() {
    const compTasks = [];

    this.projectList.forEach((proj) => {
      proj.taskList.forEach((task) => {
        if (task.isCompleted) {
          compTasks.push({ proj, task });
        }
      });
    });

    return compTasks;
  }
}
