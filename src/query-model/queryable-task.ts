import { Task } from "../data-model/task";
import { QueryableTag } from "./queryable-tag";

export interface QueryableTask {
  $checked: boolean;
  status: string;
  text: string;
  tags: QueryableTag[];
}

export namespace QueryableTask {
  export function fromTask(task: Task): QueryableTask {
    return {
      $checked: task.checked,
      status: task.checked ? "closed" : "open",
      text: task.text,
      tags: task.tags.map(QueryableTag.fromTag),
    };
  }
}
