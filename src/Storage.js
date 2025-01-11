import App from "./App";
import Project from "./Project";
import Task from "./Task";

export default class Storage {
  static loadData() {
    const appData = Object.assign(
      new App(),
      JSON.parse(localStorage.getItem("data"))
    );

    appData.projectList = appData.projectList.map((proj) =>
      Object.assign(new Project(), proj)
    );

    appData.projectList.forEach(
      (proj) =>
        (proj.taskList = proj.taskList.map((task) =>
          Object.assign(new Task(), task)
        ))
    );

    return appData;
  }

  static saveData(app) {
    localStorage.setItem("data", JSON.stringify(app));
  }
}
