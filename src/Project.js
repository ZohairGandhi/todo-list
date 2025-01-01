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
      this.taskList.findIndex((item) => item.title === taskTitle)
    );
  }
}
