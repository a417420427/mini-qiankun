<script setup lang="ts">
import { onMounted } from 'vue';

import { loadMicroApp } from '@a417420427/mini-qiankun';

onMounted(() => {
loadMicroApp({
  entry: 'http://localhost:5175', // micro-react
  container: document.getElementById('micro-react')!,
  sandbox: true
});


loadMicroApp({
  entry: 'http://localhost:5174', // micro-html
  container: document.getElementById('micro-html')!,
  sandbox: true
});


})
</script>
<template>
  <div>
    <h1>主应用 (Vue)</h1>
    <h2>子应用1 - HTML</h2>
    <div id="micro-html" style="border: 1px solid #ccc; padding: 10px;"></div>

    <h2>子应用2 - React</h2>
    <div id="micro-react" style="border: 1px solid #ccc; padding: 10px;"></div>
  </div>
</template>


