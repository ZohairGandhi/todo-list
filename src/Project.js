import { isToday, differenceInDays } from "date-fns";

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

  filterToday() {
    return this.taskList.filter((task) => isToday(task.dueDate));
  }

  filterThisWeek() {
    return this.taskList.filter(
      (task) => differenceInDays(task.dueDate, new Date()) <= 7
    );
  }
}
