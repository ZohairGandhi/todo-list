import Project from "./Project";
import Storage from "./Storage";

export default class App {
  constructor() {
    this.projectList = [];
    this.projectList.push(new Project("Default"));
  }

  addProject(proj) {
    this.projectList.push(proj);
    Storage.saveData(this);
  }

  removeProject(projTitle) {
    this.projectList.splice(
      this.projectList.findIndex((proj) => proj.title === projTitle)
    );
    Storage.saveData(this);
  }

  getProject(projTitle) {
    return this.projectList.find((proj) => proj.title === projTitle);
  }

  addTaskToProj(projTitle, task) {
    this.getProject(projTitle).addTask(task);
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

    for (const proj of this.projectList) {
      for (const task of proj.taskList) {
        if (dueDate === "today") {
          if (task.isDueToday()) {
            todayTasks.push(task);
          }
        } else {
          if (task.isDueThisWeek()) {
            todayTasks.push(task);
          }
        }
      }
    }

    return todayTasks;
  }

  filterCompleted() {
    const compTasks = [];

    for (const proj of this.projectList) {
      for (const task of proj.taskList) {
        if (task.isCompleted) {
          compTasks.push(task);
        }
      }
    }

    return compTasks;
  }
}
