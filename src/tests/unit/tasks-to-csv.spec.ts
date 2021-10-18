import { Task } from "@/types/task";
import { delimitCell, tasksToArray, tasksToCsv } from "@/utils/tasks-to-csv";

describe("tasksToCsv.ts - delimitCell", () => {
  it("does nothing when commas are not present", () => {
    const text = "a";

    const delimited = delimitCell(text);

    expect(delimited).toBe(text);
  });

  it("delimits commas", () => {
    const text = "a,b";

    const delimited = delimitCell(text);

    expect(delimited).toBe('"a,b"');
  });

  it("delimits commas and quotes", () => {
    const text = 'a,"b"';

    const delimited = delimitCell(text);

    expect(delimited).toBe('"a,""b"""');
  });

  it("delimits commas and single quote", () => {
    const text = 'a,"b';

    const delimited = delimitCell(text);

    expect(delimited).toBe('"a,""b"');
  });

  it("delimits newlines", () => {
    const text = "\nb";

    const delimited = delimitCell(text);

    expect(delimited).toBe('"\nb"');
  });

  it("delimits commas and quotes and newlines", () => {
    const text = 'a,"b\nb"';

    const delimited = delimitCell(text);

    expect(delimited).toBe('"a,""b\nb"""');
  });
});

describe("tasksToCsv.ts - tasksToArray", () => {
  it("converts tasks to csv", () => {
    const tasks: Task[] = [
      {
        id: "123",
        description: "Desc",
        summary: "Summary",
        parentId: "Parent ID",
        assigneeEmail: "alegemaate@gmail.com",
        dueDate: "2020-12-12",
        createdDate: "2021-12-12",
        modifiedDate: "2022-12-12",
        resolvedDate: "2023-12-12",
        startDate: "2024-12-12",
        priority: "low",
        column: "QA",
        labels: ["Test", "Test2"],
        type: "epic",
        epic: "Epic",
      },
    ];

    const [, column1] = tasksToArray(tasks);

    expect(column1).toEqual([
      "123",
      "2021-12-12",
      "2023-12-12",
      "2022-12-12",
      "Desc",
      "QA",
      "alegemaate@gmail.com",
      "2024-12-12",
      "2020-12-12",
      '"Test,Test2"',
      "Summary",
      "Parent ID",
      "epic",
    ]);
  });
});

describe("tasksToCsv.ts - tasksToCsv", () => {
  it("converts tasks to csv", () => {
    const tasks: Task[] = [
      {
        id: "123",
        description: "Desc",
        summary: "Summary",
        parentId: "Parent ID",
        assigneeEmail: "alegemaate@gmail.com",
        dueDate: "2020-12-12",
        createdDate: "2021-12-12",
        modifiedDate: "2022-12-12",
        resolvedDate: "2023-12-12",
        startDate: "2024-12-12",
        priority: "low",
        column: "QA",
        labels: ["Test", "Test2"],
        type: "epic",
        epic: "Epic",
      },
    ];

    const [headers, column1] = tasksToCsv(tasks).split("\n");

    expect(headers).toEqual(
      "Issue Id,Date Created,Date Resolved,Date Modified,Description,Status,Assignee,Start date,Due date,Labels,Summary,Parent Id,Issue Type"
    );

    expect(column1).toEqual(
      '123,2021-12-12,2023-12-12,2022-12-12,Desc,QA,alegemaate@gmail.com,2024-12-12,2020-12-12,"Test,Test2",Summary,Parent ID,epic'
    );
  });
});
