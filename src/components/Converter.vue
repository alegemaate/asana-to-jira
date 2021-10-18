<template>
  <div>
    <va-card>
      <va-card-title>Upload an Asana .csv Export</va-card-title>
      <va-card-content class="card-content">
        <file-upload
          class="divider"
          file-types=".csv"
          @change="handleFileUpload"
        />
        <va-button class="divider" :disabled="!csvData" @click="handleConvert">
          Convert to Jira
        </va-button>
        <va-button
          class="divider"
          :disabled="tasks.length === 0"
          @click="handleDownload"
        >
          Download
        </va-button>
      </va-card-content>
    </va-card>
    <div v-for="task in tasks" :key="task.id">
      <div class="divider">
        <task-viewer :task="task" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FileUpload from "@/components/FileUpload.vue";
import TaskViewer from "@/components/TaskViewer.vue";
import { convertTasks } from "@/utils/convert-tasks";
import { tasksToCsv } from "@/utils/tasks-to-csv";
import { Task } from "@/types/task";

@Options({
  components: {
    FileUpload,
    TaskViewer,
  },
})
export default class Converter extends Vue {
  csvData = "";

  tasks: Task[] = [];

  handleFileUpload(file: File): void {
    this.createInput(file);
  }

  createInput(file: File): void {
    var reader = new FileReader();
    reader.onload = () => {
      this.csvData = reader.result as string;
    };
    reader.readAsText(file);
  }

  handleConvert(): void {
    this.tasks = convertTasks(this.csvData);
  }

  handleDownload(): void {
    const text = tasksToCsv(this.tasks);

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", "converted.csv");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.divider {
  margin: 16px 0;
}
.card-content {
  display: flex;
  flex-direction: column;
}
</style>
