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
      epic: "",
      epicLink: "",
      epicName: "",
    }
  );

/**
 * POST PROCESSING
 **/
export const postProcessCsvData = (tasks: Task[]): Task[] => {
  const epicNames = [
    ...new Set(tasks.map((task) => task.epic ?? "").filter((epic) => epic)),
  ];

  const epics = createEpics(epicNames);

  const epicMap = epics.reduce<Record<string, Task>>(
    (acc, task) => ({ ...acc, [task.summary]: task }),
    {}
  );

  const taskMap = tasks.reduce<Record<string, Task>>(
    (acc, task) => ({ ...acc, [task.summary]: task }),
    {}
  );

  console.log(epicMap);

  return epics.concat(
    tasks.map((task) => postProcessColumn(task, taskMap, epicMap))
  );
};

export const postProcessColumn = (
  task: Task,
  taskMap: Record<string, Task>,
  epicMap: Record<string, Task>
): Task => {
  if (task.resolvedDate && task.column) {
    task.column = "Done";
  }

  if (task.parentId) {
    const parent = taskMap[task.parentId];
    if (parent) {
      task.type = "subtask";
      task.parentId = parent.id;
    }
  } else if (task.epic) {
    const epic = epicMap[task.epic];
    if (epic) {
      task.epicLink = epic.summary;
    }
  }

  return task;
};

export const createEpics = (names: string[]): Task[] => {
  return names.map((name) => ({
    id: Math.random().toString().slice(2, 11),
    description: "",
    summary: name,
    parentId: "",
    assigneeEmail: "",
    dueDate: "",
    createdDate: "",
    modifiedDate: "",
    resolvedDate: "",
    startDate: "",
    priority: "",
    column: "To Do",
    labels: [],
    type: "epic",
    epic: "",
    epicName: name,
    epicLink: "",
  }));
};
