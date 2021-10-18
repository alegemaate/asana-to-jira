import { EXPORT_HEADER_MAP } from "@/constants/header-map";
import { Task } from "@/types/task";

export const tasksToCsv = (tasks: Task[]): string => {
  const array = tasksToArray(tasks);

  const joined = array.map((row) => row.join(",")).join("\n");

  return joined;
};

export const tasksToArray = (tasks: Task[]): string[][] => {
  const headers = EXPORT_HEADER_MAP.map((header) => header.jiraName);

  const objHeaders = EXPORT_HEADER_MAP.map((header) => header.objName);

  const rows = tasks.map((task) =>
    objHeaders.map((header) => {
      if (header === "labels") {
        return delimitCell(task.labels.join(","));
      }
      return delimitCell(task[header]);
    })
  );
  return [headers, ...rows];
};

export const delimitCell = (text: string): string => {
  let escaped = text;
  if (escaped.includes('"')) {
    escaped = escaped.replace(/"/g, '\\"');
  }

  if (escaped.includes(",") || escaped.includes("\n")) {
    escaped = `"${escaped}"`;
  }
  return escaped;
};
