<template>
  <div id="app">
    <Navbar />
    <router-view class="container" />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-attachment: fixed;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  position: relative;
}

/* Global scrollbar styling */
:deep(::-webkit-scrollbar) {
  width: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

:deep(::-webkit-scrollbar-thumb) {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
}

:deep(::-webkit-scrollbar-thumb:hover) {
  background: linear-gradient(135deg, #5a6fd8, #6a4c93);
}

/* Global transition animations */
* {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

/* Global focus styles */
:deep(*:focus) {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

/* Global text selection styles */
:deep(::selection) {
  background: rgba(102, 126, 234, 0.3);
  color: #2c3e50;
}
</style>
