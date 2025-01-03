import Project from "./Project";

export default class App {
  constructor() {
    this.projectList = [];
    this.projectList.push(new Project("Default"));
  }

  addProject(proj) {
    this.projectList.push(proj);
  }

  removeProject(projTitle) {
    this.projectList.splice(
      this.projectList.findIndex((proj) => proj.title === projTitle)
    );
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
