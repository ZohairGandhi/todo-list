export default class Project {
  constructor(title) {
    this.title = title;
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }

  removeTask(taskTitle) {
    this.taskList.splice(
      this.taskList.findIndex((task) => task.title === taskTitle)
    );
  }

  getTask(taskTitle) {
    return this.taskList.find((task) => task.title === taskTitle);
  }
}
