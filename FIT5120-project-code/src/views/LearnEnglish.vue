<template>
  <div class="learn-english-container">
    <header class="page-header">
      <h1>Speaking Up: English for Everyday Life</h1>
      <p class="subtitle">Learn essential English phrases for daily situations</p>
    </header>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading phrases...</p>
    </div>

    <div v-if="hasError" class="error-state">
      <p>⚠️ Failed to load phrases. Please try again later.</p>
      <button @click="fetchCards()">Retry</button>
    </div>

    <div v-else>
      <div class="controls-section">
        <div class="category-selector">
          <label>Choose Category:</label>
          <div class="category-buttons">
            <button
              @click="currentCategory = 'greetings'"
              :class="{ active: currentCategory === 'greetings' }"
            >
              Basic Greetings
            </button>
            <button
              @click="currentCategory = 'emergency'"
              :class="{ active: currentCategory === 'emergency' }"
            >
              Emergency Phrases
            </button>
            <button
              @click="currentCategory = 'shopping'"
              :class="{ active: currentCategory === 'shopping' }"
            >
              Shopping Vocabularies
            </button>
          </div>
        </div>


        <div class="language-selector">
          <label>Translation Language:</label>
          <div class="language-buttons">
            <button
              @click="currentLanguage = 'chinese'"
              :class="{ active: currentLanguage === 'chinese' }"
              class="language-btn"
            >
              🇨🇳 Chinese
            </button>
            <button
              @click="currentLanguage = 'vietnamese'"
              :class="{ active: currentLanguage === 'vietnamese' }"
              class="language-btn"
            >
              🇻🇳 Vietnamese
            </button>
            <button
              @click="currentLanguage = 'indonesian'"
              :class="{ active: currentLanguage === 'indonesian' }"
              class="language-btn"
            >
              🇮🇩 Indonesian
            </button>
          </div>
        </div>
      </div>

      <!-- Learning cards area -->
      <div class="cards-section">
        <div class="cards-container">
          <div
            v-for="card in filteredCards"
            :key="card.key"
            class="phrase-card"
          >
            <div class="english-phrase">
              <h3>{{ card.translations?.en }}</h3>
            </div>

            <!-- Translation content -->
            <div class="translation">
              <p>{{ getTranslation(card) }}</p>
            </div>

            <!-- Pronunciation button -->
            <button
              class="speaker-btn"
              @click="playPronunciation(card.translations?.en || '')"
              aria-label="Play pronunciation"
            >
              🔊
            </button>
          </div>
        </div>

        <!-- Empty state prompt -->
        <div v-if="filteredCards.length === 0" class="empty-state">
          <p>No phrases available for this category.</p>
        </div>
      </div>

      <!-- Learning progress area -->
      <div class="progress-section">
        <div class="progress-info">
          <span>Current: {{ currentCategoryText }}</span>
          <span>Phrases: {{ filteredCards.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { englishService } from '@/services/englishService'; // Import service


const currentCategory = ref('greetings');
const currentLanguage = ref('chinese');
const cards = ref([]);


const isLoading = ref(true);
const hasError = ref(false);

onMounted(() => {
  fetchCards();
});


const fetchCards = async () => {
  try {

    isLoading.value = true;
    hasError.value = false;

    const response = await englishService.getPhrases();

    if (response && response.data) {
      cards.value = response.data;
    } else {
      cards.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch phrases:', error);
    hasError.value = true;
    cards.value = [];
  } finally {
    isLoading.value = false;
  }
};

const filteredCards = computed(() => {
  if (!cards.value) return [];
  return cards.value.filter(card => card.category === currentCategory.value);
});

const currentCategoryText = computed(() => {
  switch(currentCategory.value) {
    case 'greetings': return 'Basic Greetings';
    case 'emergency': return 'Emergency Phrases';
    case 'shopping': return 'Shopping Vocabularies';
    default: return '';
  }
});


const getTranslation = (card) => {

  if (!card.translations) return 'No translation available';

  switch(currentLanguage.value) {
    case 'chinese':
      return card.translations.zh || 'No translation available'; // translations.zh
    case 'vietnamese':
      return card.translations.vi || 'No translation available'; // translations.vi
    case 'indonesian':
      return card.translations.id || 'No translation available'; // translations.id
    default:
      return card.translations.zh || 'No translation available';
  }
};


const playPronunciation = (text) => {

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};
</script>

<style scoped>
.learn-english-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  position: relative;
}

.learn-english-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  pointer-events: none;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  box-shadow: 0 8px 32px rgba(0, 208, 132, 0.1);
  position: relative;
  z-index: 1;
}

.page-header h1 {
  color: #2d3748;
  font-size: 2.8rem;
  margin-bottom: 15px;
  font-weight: 800;
  text-shadow: none;
  background: linear-gradient(45deg, #00d084, #4de6a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #718096;
  font-size: 1.3rem;
  margin: 0;
  text-shadow: none;
  font-weight: 500;
}

.loading-state {
  text-align: center;
  padding: 100px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  box-shadow: 0 8px 32px rgba(0, 208, 132, 0.1);
  position: relative;
  z-index: 1;
}

.spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto 25px;
  border: 4px solid rgba(0, 208, 132, 0.2);
  border-top: 4px solid #00d084;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #00d084;
  font-weight: 600;
  font-size: 18px;
}

.error-state {
  text-align: center;
  padding: 60px 30px;
  color: #e74c3c;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  position: relative;
  z-index: 1;
}

.error-state button {
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #00d084, #4de6a3);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 208, 132, 0.3);
}

.error-state button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 208, 132, 0.4);
}

.controls-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 35px;
  margin-bottom: 40px;
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  position: relative;
  z-index: 1;
}

.category-selector, .language-selector {
  margin-bottom: 25px;
}

.category-selector:last-child, .language-selector:last-child {
  margin-bottom: 0;
}

.controls-section label {
  display: block;
  margin-bottom: 15px;
  font-weight: 700;
  color: #2d3748;
  font-size: 1.2rem;
}

.category-buttons, .language-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.category-buttons button, .language-buttons button {
  padding: 15px 25px;
  border: 2px solid rgba(0, 208, 132, 0.2);
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #00d084;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.category-buttons button::before, 
.language-buttons button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.category-buttons button:hover::before,
.language-buttons button:hover::before {
  left: 100%;
}

.category-buttons button.active, .language-buttons button.active {
  background: linear-gradient(135deg, #00d084, #4de6a3);
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 25px rgba(0, 208, 132, 0.4);
  transform: translateY(-2px);
}

.category-buttons button:hover:not(.active),
.language-buttons button:hover:not(.active) {
  background: rgba(0, 208, 132, 0.1);
  border-color: rgba(0, 208, 132, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 208, 132, 0.2);
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cards-section {
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.phrase-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 35px;
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.phrase-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #00d084, #4de6a3);
}

.phrase-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 208, 132, 0.15);
  border-color: rgba(0, 208, 132, 0.2);
}

.english-phrase h3 {
  color: #2d3748;
  font-size: 1.6rem;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(0, 208, 132, 0.2);
  font-weight: 700;
  width: 100%;
}

.translation p {
  color: #00d084;
  font-size: 1.3rem;
  margin: 0;
  padding: 15px 0;
  font-weight: 600;
  line-height: 1.6;
}

.speaker-btn {
  background: linear-gradient(135deg, #00d084, #4de6a3);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  box-shadow: 0 8px 20px rgba(0, 208, 132, 0.3);
  position: relative;
  overflow: hidden;
}

.speaker-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.speaker-btn:hover::before {
  width: 100%;
  height: 100%;
}

.speaker-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(0, 208, 132, 0.5);
}

.empty-state {
  text-align: center;
  padding: 80px 30px;
  color: #718096;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  font-size: 18px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.progress-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 15px 35px rgba(0, 208, 132, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 208, 132, 0.1);
  position: relative;
  z-index: 1;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-weight: 700;
  color: #2d3748;
  font-size: 16px;
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .category-buttons, .language-buttons {
    flex-direction: column;
  }

  .category-buttons button, .language-buttons button {
    width: 100%;
    margin-bottom: 10px;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .phrase-card {
    padding: 25px;
  }

  .controls-section {
    padding: 25px;
  }

  .learn-english-container {
    padding: 15px;
  }
}
</style>
