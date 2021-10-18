import { Task } from "./task";

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
