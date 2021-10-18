<template>
  <va-card stripe :stripe-color="resolveColor" :class="resolveClass">
    <va-card-title>{{ resolveTitle }}</va-card-title>
    <va-card-content>
      <div class="title">
        {{ task.description }}
      </div>
      <div v-if="task.summary" class="info-item">
        <b>Summary: </b>
        {{ task.summary }}
      </div>
      <div v-if="task.assigneeEmail" class="info-item">
        <b>Assigned To: </b>
        {{ task.assigneeEmail }}
      </div>
      <div v-if="task.labels.length" class="info-item">
        <b>Labels: </b>
        <div v-for="label in task.labels" :key="label">
          <div>{{ label }}</div>
        </div>
      </div>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Task } from "@/utils/convertTasks";

@Options({
  props: {
    task: Object,
  },
})
export default class TaskViewer extends Vue {
  task!: Task;

  get resolveTitle(): string {
    if (this.task.column) {
      return `${this.task.id} - ${this.task.column}`;
    }
    return this.task.id;
  }

  get resolveColor(): string {
    switch (this.task.type) {
      case "task":
        return "#4BADE8";
      case "subtask":
        return "#4BADE8";
      case "story":
        return "#63BA3C";
      case "epic":
        return "#904EE2";
      default:
        return "grey";
    }
  }

  get resolveClass(): string {
    switch (this.task.type) {
      case "subtask":
      case "story":
        return "indented";
      default:
        return "";
    }
  }
}
</script>

<style scoped lang="scss">
.info-item {
  text-align: start;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}

.indented {
  margin-left: 5%;
  border-left: 5px solid #ccc;
}

.title {
  text-align: start;
  font-size: 1.02em;
  padding-bottom: 1em;
}
</style>
