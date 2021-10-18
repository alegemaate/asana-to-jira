<template>
  <div class="home row justify--center">
    <div class="flex md6 lg4">
      <Converter />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Converter from "@/components/Converter.vue";

@Options({
  components: {
    Converter,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  margin: 8px auto 8px auto;
}
</style>
