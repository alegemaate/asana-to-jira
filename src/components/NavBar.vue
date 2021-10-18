<template>
  <va-navbar color="primary">
    <template #left>
      <va-navbar-item>Asana to JIRA</va-navbar-item>
    </template>
    <!-- <template #center>
      <va-navbar-item><router-link to="/">Home</router-link></va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item
        ><router-link to="/about">About</router-link></va-navbar-item
      >
    </template> -->
  </va-navbar>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class NavBar extends Vue {}
</script>
