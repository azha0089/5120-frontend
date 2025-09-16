<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo" @click="$router.push('/')">
        <span class="logo-text">Ankang Life</span>
   
      </div>
      <el-menu 
        mode="horizontal" 
        :default-active="activeIndex"
        class="navbar-menu"
        :ellipsis="false"
        background-color="transparent"
        text-color="#2d3748"
        active-text-color="#00d084"
      >
        <el-menu-item index="home" @click="navigateTo('/')">
          <el-icon><House /></el-icon>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="facilities" @click="navigateTo('/FindFacility_Event')">
          <el-icon><MapLocation /></el-icon>
          <span>Find Facilities</span>
        </el-menu-item>
        <el-menu-item index="english" @click="navigateTo('/learnenglish')">
          <el-icon><ChatDotRound /></el-icon>
          <span>Learn English</span>
        </el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { House, MapLocation, ChatDotRound } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// Set active state based on current route
const activeIndex = computed(() => {
  const path = route.path
  if (path === '/') return 'home'
  if (path === '/FindFacility_Event') return 'facilities'
  if (path === '/learnenglish') return 'english'
  return 'home'
})

// Navigation function
const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
/* Fresh white navbar */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 208, 132, 0.08);
  border-bottom: 1px solid rgba(0, 208, 132, 0.1);
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo styles */
.navbar-logo {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  transform: translateY(-1px);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.2;
  margin: 0;
}

.logo-sub {
  font-size: 0.8rem;
  font-weight: 300;
  color: #00d084;
  line-height: 1;
  margin-top: -2px;
}

/* Element Plus Menu custom styles */
.navbar-menu {
  border-bottom: none !important;
  background: transparent !important;
}

:deep(.el-menu--horizontal) {
  border-bottom: none !important;
}

:deep(.el-menu-item) {
  border-bottom: 2px solid transparent !important;
  padding: 0 20px !important;
  height: 50px !important;
  line-height: 50px !important;
  margin: 0 4px !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
  font-weight: 500 !important;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(0, 208, 132, 0.08) !important;
  color: #00d084 !important;
  transform: translateY(-1px) !important;
}

:deep(.el-menu-item.is-active) {
  border-bottom: 2px solid #00d084 !important;
  background-color: rgba(0, 208, 132, 0.1) !important;
  color: #00d084 !important;
  font-weight: 600 !important;
}

:deep(.el-menu-item .el-icon) {
  margin-right: 6px !important;
  font-size: 16px !important;
}

:deep(.el-menu-item span) {
  font-size: 14px !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 0;
  }
  
  .navbar-container {
    padding: 0 1rem;
    flex-direction: column;
    gap: 15px;
  }
  
  .logo-text {
    font-size: 1.3rem;
  }
  
  .logo-sub {
    font-size: 0.75rem;
  }
  
  .navbar-menu {
    width: 100%;
  }
  
  :deep(.el-menu-item) {
    padding: 0 15px !important;
    height: 45px !important;
    line-height: 45px !important;
    margin: 0 2px !important;
  }
  
  :deep(.el-menu-item span) {
    font-size: 13px !important;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    gap: 12px;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  :deep(.el-menu-item) {
    padding: 0 12px !important;
    height: 42px !important;
    line-height: 42px !important;
  }
  
  :deep(.el-menu-item span) {
    font-size: 12px !important;
  }
  
  :deep(.el-menu-item .el-icon) {
    font-size: 14px !important;
  }
}

/* Scroll effects */
@media (hover: hover) {
  .navbar:hover {
    box-shadow: 0 4px 25px rgba(0, 208, 132, 0.12);
  }
}
</style>
