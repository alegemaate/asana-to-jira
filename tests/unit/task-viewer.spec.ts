import { shallowMount } from "@vue/test-utils";
import TaskViewer from "@/components/TaskViewer.vue";

describe("TaskViewer.vue", () => {
  it("renders props.msg when passed", () => {
    const task = {
      id: "9f803d66-b2a1-4818-9fe1-44689c489844",
      description: "203df53a-91b6-4cab-a45d-de00736edac3",
      summary: "b69fd498-0b72-4bb1-9e09-89903f4ba90d",
      parentId: "",
      assigneeEmail: "69a64847-0916-4f09-adc2-3a7814d031ec",
      dueDate: "",
      createdDate: "",
      modifiedDate: "",
      resolvedDate: "",
      startDate: "",
      priority: "",
      column: "088c8866-7512-4f06-a8ef-aaf0a14d6b5e",
      labels: [],
      type: "task",
    };

    const wrapper = shallowMount(TaskViewer, {
      props: {
        task,
      },
    });

    const wrapperText = wrapper.text();

    expect(wrapperText).toMatch(task.id);
    expect(wrapperText).toMatch(task.description);
    expect(wrapperText).toMatch(task.summary);
    expect(wrapperText).toMatch(task.assigneeEmail);
    expect(wrapperText).toMatch(task.column);
  });
});
