export default class Task {
  constructor(
    title,
    desc = null,
    dueDate = null,
    priority = null,
    isCompleted = false
  ) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }
}
