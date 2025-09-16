<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MapLocation, ChatDotRound, House, Calendar } from '@element-plus/icons-vue'

const router = useRouter()

// Features data - simplified to core functions
const features = ref([
  {
    id: 1,
    title: 'Find Facilities',
    description: 'Discover libraries, community centers, and cultural spaces near you.',
    icon: House,
    color: '#00d084',
    route: '/FindFacility_Event'
  },
  {
    id: 2,
    title: 'Find Events',
    description: 'Find community events tailored to your interests.',
    icon: Calendar,
    color: '#ff7675',
    route: '/FindFacility_Event'
  },
  {
    id: 3,
    title: 'Learn English',
    description: 'Essential English phrases for daily situations.',
    icon: ChatDotRound,
    color: '#fda085',
    route: '/learnenglish'
  }
])

// Navigate to corresponding function
const navigateToFeature = (featureId) => {
  const feature = features.value.find(f => f.id === featureId)
  if (feature) {
    router.push(feature.route)
  }
}
</script>

<template>
  <div class="home-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="section-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="title-main">Ankang Life</span>
            <span class="title-sub">安康生活</span>
          </h1>
          <p class="hero-description">
            Your guide to Melbourne's multicultural community
          </p>
          <div class="hero-buttons">
            <el-button 
              type="primary" 
              size="large" 
              :icon="MapLocation"
              @click="$router.push('/FindFacility_Event')"
              class="hero-btn"
            >
              Explore Melbourne
            </el-button>
            <el-button 
              type="success" 
              size="large" 
              :icon="ChatDotRound"
              @click="$router.push('/learnenglish')"
              class="hero-btn"
            >
              Learn English
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Core features display -->
    <section class="features-section">
      <div class="section-container">
        <h2 class="section-title">Discover Melbourne</h2>
        <el-row :gutter="32" class="features-grid">
          <el-col :xs="24" :sm="8" v-for="feature in features" :key="feature.id">
            <div class="feature-card" @click="navigateToFeature(feature.id)">
              <div class="feature-icon">
                <el-icon :size="48" :color="feature.color">
                  <component :is="feature.icon" />
                </el-icon>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-desc">{{ feature.description }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- Simplified introduction -->
    <section class="about-section">
      <div class="section-container">
        <el-row :gutter="40" align="middle">
          <el-col :xs="24" :lg="12">
            <div class="about-content">
              <h2 class="about-title">安康 means wellness</h2>
              <p class="about-description">
                Find your place in Melbourne's diverse community. Discover local facilities, 
                join events, and learn English phrases to help you thrive in your new home.
              </p>
            </div>
          </el-col>
          <el-col :xs="24" :lg="12">
            <div class="about-image">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Melbourne cityscape"
                class="city-img"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Fresh color scheme - avoid blue */
:root {
  --primary-color: #00d084;      /* Mint green */
  --primary-light: #4de6a3;     /* Light mint green */
  --secondary-color: #ff7675;    /* Coral red */
  --accent-color: #fda085;       /* Peach orange */
  --text-primary: #2d3748;       /* Dark gray */
  --text-secondary: #718096;     /* Medium gray */
  --bg-primary: #f7fafc;         /* Very light gray-green */
  --bg-secondary: #ffffff;       /* Pure white */
  --bg-accent: #f0fff4;          /* Very light mint color */
  --shadow-soft: 0 2px 12px rgba(0, 208, 132, 0.08);
  --shadow-medium: 0 4px 20px rgba(0, 208, 132, 0.12);
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
}

/* Layout */
.home-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  position: relative;
}

.home-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  pointer-events: none;
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

/* Smaller Hero Section */
.hero-section {
  background: rgba(255, 255, 255, 0.95);
  color: #2d3748;
  padding: 3rem 0;
  min-height: 30vh;    /* Reduced from 50vh to 30vh */
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  box-shadow: 0 8px 32px rgba(0, 208, 132, 0.1);
  margin: 0 20px 2rem 20px;
}

.hero-content {
  text-align: center;
  max-width: 550px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  margin: 0 0 1.2rem 0;
  line-height: 1.2;
}

.title-main {
  display: block;
  font-size: 2.5rem;    /* Reduced font size */
  font-weight: 700;
  margin-bottom: 0.3rem;
  background: linear-gradient(45deg, #00d084, #4de6a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sub {
  display: block;
  font-size: 1.2rem;    /* Reduced font size */
  font-weight: 300;
  color: #718096;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1rem;    /* Reduced font size */
  line-height: 1.5;
  margin: 0 0 1.8rem 0; /* Reduced spacing */
  color: #718096;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  min-width: 150px;     /* Reduced button width */
}

/* Simplified feature display */
.features-section {
  padding: 3rem 0;      /* Reduced padding */
  background: transparent;
  position: relative;
  z-index: 1;
}

.section-title {
  text-align: center;
  font-size: 2rem;      /* Reduced title size */
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2.5rem 0; /* Reduced spacing */
  line-height: 1.2;
}

.features-grid {
  margin-top: 1rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid rgba(0, 208, 132, 0.1);
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.08);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #00d084, #4de6a3);
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 208, 132, 0.15);
  border-color: rgba(0, 208, 132, 0.2);
}

.feature-icon {
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.feature-title {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  flex-shrink: 0;
}

.feature-desc {
  color: #718096;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;
}

/* Simplified about section */
.about-section {
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.08);
  margin: 0 20px;
  position: relative;
  z-index: 1;
}

.about-content {
  padding-right: 2rem;
}

.about-title {
  font-size: 1.8rem;    /* Reduced font size */
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.2rem 0;
  line-height: 1.2;
}

.about-description {
  font-size: 1rem;      /* Reduced font size */
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.city-img {
  width: 100%;
  max-width: 450px;     /* Reduced image size */
  height: 280px;        /* Reduced height */
  object-fit: cover;
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.12);
  transition: transform 0.3s ease;
  border: 1px solid rgba(0, 208, 132, 0.1);
}

.city-img:hover {
  transform: scale(1.02);
}

/* Element Plus theme customization */
:deep(.el-button--primary) {
  background: linear-gradient(135deg, #00d084, #4de6a3);
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(0, 208, 132, 0.3);
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #4de6a3, #00d084);
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 208, 132, 0.4);
}

:deep(.el-button--success) {
  background: linear-gradient(135deg, #ff7675, #fda085);
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(255, 118, 117, 0.3);
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.el-button--success:hover) {
  background: linear-gradient(135deg, #fda085, #ff7675);
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 118, 117, 0.4);
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
    min-height: 25vh;    /* Further reduced for mobile */
    margin: 0 15px 2rem 15px;
  }
  
  .title-main {
    font-size: 2rem;
  }
  
  .title-sub {
    font-size: 1rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-btn {
    width: 100%;
    max-width: 260px;
  }
  
  .features-section,
  .about-section {
    padding: 2.5rem 0;
  }
  
  .section-title {
    font-size: 1.7rem;
  }
  
  .about-content {
    padding-right: 0;
    margin-bottom: 2rem;
  }
  
  .about-section {
    margin: 0 15px;
  }
  
  .about-title {
    font-size: 1.5rem;
  }
  
  .city-img {
    height: 220px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1.5rem 0;
    min-height: 20vh;    /* Minimum height for small screens */
    margin: 0 10px 2rem 10px;
  }
  
  .about-section {
    margin: 0 10px;
  }
  
  .title-main {
    font-size: 1.8rem;
  }
  
  .features-section,
  .about-section {
    padding: 2rem 0;
  }
  
  .feature-card {
    padding: 1.5rem 1rem;
    height: 260px;
  }
  
  .feature-title {
    font-size: 1.2rem;
  }
  
  .feature-desc {
    font-size: 0.9rem;
  }
  
  .city-img {
    height: 200px;
  }
}
</style>
