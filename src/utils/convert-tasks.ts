import { IMPORT_HEADER_MAP } from "@/constants/header-map";
import { IndexedHeaderMap } from "@/types/header-map";
import { Task } from "@/types/task";
import { csvToArray } from "./csv-to-array";

interface ParsedCsvData {
  headers: string[];
  cells: string[][];
}

/**
 * START
 **/
export const convertTasks = (csvData: string): Task[] => {
  const parsed = parseCsvData(csvData);
  const validated = validateCsvData(parsed);
  const converted = convertCsvData(validated);
  const processed = postProcessCsvData(converted);

  return processed;
};

/**
 * PARSE
 **/
export const parseCsvData = (csvData: string): ParsedCsvData => {
  const cells = csvToArray(csvData);

  if (cells.length < 1) {
    throw new Error("CSV data is invalid");
  }

  return { headers: cells[0], cells: cells.slice(1) };
};

/**
 * VALIDATE
 **/
export const validateCsvData = (csvData: ParsedCsvData): ParsedCsvData => {
  csvData.cells.forEach((cells) => {
    if (cells.length !== csvData.headers.length) {
      throw new Error(
        `Cell length does not match header length, got ${cells.length} expected ${csvData.headers.length}`
      );
    }
  });

  return csvData;
};

/**
 * CONVERT TO TASK
 **/
export const convertCsvData = (csvData: ParsedCsvData): Task[] => {
  const headers = parseHeaders(csvData.headers);

  return csvData.cells.map((cells) => parseColumn(headers, cells));
};

export const parseHeaders = (headers: string[]): (IndexedHeaderMap | null)[] =>
  headers.flatMap((header, index) => {
    const found = IMPORT_HEADER_MAP.find((map) => map.asanaName === header);
    if (!found) {
      return null;
    }
    return {
      index,
      ...found,
    };
  });

export const parseColumn = (
  headers: (IndexedHeaderMap | null)[],
  column: string[]
): Task =>
  headers.reduce<Task>(
    (acc, header) => {
      if (header === null) {
        return acc;
      }

      switch (header.objName) {
        case "type":
          acc.type = "task";
          break;
        case "labels":
          acc.labels = column[header.index].split(",").filter((l) => l);
          break;
        default:
          acc[header.objName] = column[header.index];
          break;
      }

      return acc;
    },
    {
      id: "",
      description: "",
      summary: "",
      parentId: "",
      assigneeEmail: "",
      dueDate: "",
      createdDate: "",
      modifiedDate: "",
      resolvedDate: "",
      startDate: "",
      priority: "",
      column: "",
      labels: [],
      type: "task",
    }
  );

/**
 * POST PROCESSING
 **/
export const postProcessCsvData = (tasks: Task[]): Task[] => {
  const taskMap = tasks.reduce<Record<string, Task>>(
    (acc, task) => ({ ...acc, [task.summary]: task }),
    {}
  );

  return tasks.map((task) => postProcessColumn(task, taskMap));
};

const EPIC_COLUMN = "Stories & Requirements";

export const postProcessColumn = (
  task: Task,
  taskMap: Record<string, Task>
): Task => {
  if (task.column === EPIC_COLUMN) {
    task.type = "epic";
  } else if (task.resolvedDate && task.column) {
    task.column = "Done";
  }

  if (task.parentId) {
    const parent = taskMap[task.parentId];
    if (parent.column === EPIC_COLUMN) {
      task.type = "story";
    } else {
      task.type = "subtask";
    }
    task.parentId = parent.id;
  }

  return task;
};
