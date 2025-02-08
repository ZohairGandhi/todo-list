import { differenceInDays, isToday, format } from "date-fns";

export default class Task {
  constructor(
    title,
    desc = null,
    dueDate = null,
    priority = null,
    isCompleted = false,
  ) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }

  isDueToday() {
    return isToday(this.dueDate);
  }

  isDueThisWeek() {
    return (
      differenceInDays(this.dueDate, new Date()) >= 0 &&
      differenceInDays(this.dueDate, new Date()) <= 7
    );
  }

  getFormattedDate() {
    return format(this.dueDate, "eee, MMM d");
  }
}
