<template>
  <input type="file" :accept="fileTypes" @change="handleUpload" />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    fileTypes: String,
    onChange: Function,
  },
})
export default class FileUpload extends Vue {
  fileTypes!: string;

  onChange!: (file: File) => void;

  handleUpload(event: InputEvent): void {
    const files = (event.target as HTMLInputElement).files;

    if (files?.length !== 1) {
      return;
    }

    const file = files[0];

    this.onChange(file);
  }
}
</script>
