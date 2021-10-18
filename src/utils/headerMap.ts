import { Task } from "@/utils/convertTasks";

/**
 * CONSTANTS
 */
export const IMPORT_HEADER_MAP: ImportHeaderMap[] = [
  { asanaName: "Task ID", objName: "id" },
  { asanaName: "Created At", objName: "createdDate" },
  {
    asanaName: "Completed At",
    objName: "resolvedDate",
  },
  {
    asanaName: "Last Modified",
    objName: "modifiedDate",
  },
  { asanaName: "Name", objName: "description" },
  { asanaName: "Section/Column", objName: "column" },
  {
    asanaName: "Assignee Email",
    objName: "assigneeEmail",
  },
  { asanaName: "Start Date", objName: "startDate" },
  { asanaName: "Due Date", objName: "dueDate" },
  { asanaName: "Tags", objName: "labels" },
  { asanaName: "Notes", objName: "summary" },
  { asanaName: "Parent Task", objName: "parentId" },
  { asanaName: "", objName: "type" },
];

export const EXPORT_HEADER_MAP: ExportHeaderMap[] = [
  { objName: "id", jiraName: "Issue Id" },
  { objName: "createdDate", jiraName: "Date Created" },
  {
    objName: "resolvedDate",
    jiraName: "Date Resolved",
  },
  {
    objName: "modifiedDate",
    jiraName: "Date Modified",
  },
  { objName: "description", jiraName: "Description" },
  { objName: "column", jiraName: "Status" },
  {
    objName: "assigneeEmail",
    jiraName: "Assignee",
  },
  { objName: "startDate", jiraName: "Start date" },
  { objName: "dueDate", jiraName: "Due date" },
  { objName: "labels", jiraName: "Labels" },
  { objName: "summary", jiraName: "Summary" },
  { objName: "parentId", jiraName: "Parent Id" },
  { objName: "type", jiraName: "Issue Type" },
];

export interface ImportHeaderMap {
  asanaName: string;
  objName: keyof Task;
}

export interface IndexedHeaderMap extends ImportHeaderMap {
  index: number;
}

export interface ExportHeaderMap {
  jiraName: string;
  objName: keyof Task;
}
