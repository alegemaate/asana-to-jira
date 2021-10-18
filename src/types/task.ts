export interface Task {
  id: string;
  description: string;
  summary: string;
  parentId: string;
  assigneeEmail: string;
  dueDate: string;
  createdDate: string;
  modifiedDate: string;
  resolvedDate: string;
  startDate: string;
  priority: string;
  column: string;
  labels: string[];
  epic: string;
  epicName: string;
  epicLink: string;
  type: "epic" | "story" | "task" | "subtask";
}
