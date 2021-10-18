import { Task } from "@/utils/convertTasks";

/**
 * CONSTANTS
 */
export const HEADER_MAP: HeaderMap[] = [
  { asanaName: "Task ID", objName: "id" },
  { asanaName: "Created At", objName: "createdDate" },
  { asanaName: "Completed At", objName: "resolvedDate" },
  { asanaName: "Last Modified", objName: "modifiedDate" },
  { asanaName: "Name", objName: "description" },
  { asanaName: "Section/Column", objName: "column" },
  { asanaName: "Assignee Email", objName: "assigneeEmail" },
  { asanaName: "Start Date", objName: "startDate" },
  { asanaName: "Due Date", objName: "dueDate" },
  { asanaName: "Tags", objName: "labels" },
  { asanaName: "Notes", objName: "summary" },
  { asanaName: "Parent Task", objName: "parentId" },
];

export interface HeaderMap {
  asanaName: string;
  objName: keyof Task;
}

export interface IndexedHeaderMap extends HeaderMap {
  index: number;
}
