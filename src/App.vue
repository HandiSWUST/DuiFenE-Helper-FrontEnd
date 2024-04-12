<script setup>
import Login from './components/Login.vue'
import {ref} from "vue";
import Menu from "./components/Menu.vue";

const status = ref(0)
const switchTab = (i) => {
  status.value = i
}
</script>

<template>
  <div v-if="status===0">
    <Login @login="switchTab"/>
  </div>
  <div v-else>
    <Menu @login="switchTab"/>
  </div>
</template>

<style scoped>

</style>
