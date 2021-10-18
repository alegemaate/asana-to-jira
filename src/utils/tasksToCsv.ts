import { Task } from "@/utils/convertTasks";
import { HEADER_MAP } from "@/utils/headerMap";

export const tasksToCsv = (tasks: Task[]): string => {
  const array = tasksToArray(tasks);

  const joined = array.map((row) => row.join(",")).join("\n");

  return joined;
};

const tasksToArray = (tasks: Task[]): string[][] => {
  const headers = HEADER_MAP.map((header) => header.objName);
  const rows = tasks.map((task) =>
    headers.map((header) => {
      if (header === "labels") {
        return delimitCommas(task.labels.join(","));
      }
      return delimitCommas(task[header]);
    })
  );
  return [headers, ...rows];
};

const delimitCommas = (text: string): string => {
  if (text.includes(",")) {
    return `"${text}"`;
  }
  return text;
};
