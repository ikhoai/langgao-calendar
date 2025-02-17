<template>
  <div class="admin-panel">
    
    <div class="event-form">
      <h2>{{ currentEvent ? 'Edit Event' : 'Create Event' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Title</label>
          <input v-model="eventForm.title" required>
        </div>
        
        <div class="form-group">
          <label>Start</label>
          <input type="datetime-local" v-model="eventForm.start" required>
        </div>
        
        <div class="form-group">
          <label>End</label>
          <input type="datetime-local" v-model="eventForm.end" required>
        </div>
        
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="eventForm.description"></textarea>
        </div>
        
        <!-- <div class="form-group">
          <label>Color</label>
          <div class="color-options">
            <button
              v-for="color in predefinedColors"
              :key="color.value"
              type="button"
              class="color-button"
              :class="{ active: eventForm.color === color.value }"
              :style="{ backgroundColor: color.value }"
              @click="eventForm.color = color.value"
            >
              <span class="sr-only">{{ color.name }}</span>
            </button>
          </div>
        </div> -->
        
        <div class="form-actions">
          <button type="submit">{{ currentEvent ? 'Update' : 'Create' }}</button>
          <button type="button" @click="resetForm">Clear</button>
        </div>
      </form>
    </div>

    <div class="events-list">
      <h2>Events</h2>
      <div v-for="event in events" :key="event._id" class="event-item">
        <div class="event-info">
          <h3>{{ event.title }}</h3>
          <p>{{ formatDate(event.start) }} - {{ formatDate(event.end) }}</p>
          <p>{{ event.description }}</p>
        </div>
        <div class="event-actions">
          <button @click="editEvent(event)">Edit</button>
          <button @click="deleteEvent(event._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import axios from 'axios'

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      events: [],
      currentEvent: null,
      eventForm: this.getDefaultForm(),
      predefinedColors: [
        { name: 'Blue', value: '#2196F3' },
        { name: 'Green', value: '#4CAF50' },
        { name: 'Red', value: '#F44336' },
        { name: 'Purple', value: '#9C27B0' }
      ],
      masks: {
        input: 'YYYY-MM-DD HH:mm'
      }
    }
  },
  methods: {
    getDefaultForm() {
      return {
        title: '',
        start: '',
        end: '',
        description: '',
        color: '#2196F3'
      }
    },
    formatDate(date) {
      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() - 7);
      return adjustedDate.toLocaleString();
    },
    async fetchEvents() {
      try {
        console.log(`${import.meta.env.VITE_API_URL}/events`)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`)
        this.events = response.data
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    },
    async handleSubmit() {
      try {
        if (this.currentEvent) {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/events/${this.currentEvent._id}`,
            this.eventForm
          )
        } else {
          await axios.post(`${import.meta.env.VITE_API_URL}/events`, this.eventForm)
        }
        this.resetForm()
        this.fetchEvents()
      } catch (error) {
        console.error('Error saving event:', error)
      }
    },
    async deleteEvent(id) {
      if (!confirm('Are you sure you want to delete this event?')) return
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/events/${id}`)
        this.fetchEvents()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    },
    editEvent(event) {
      this.currentEvent = event
      this.eventForm = {
        ...event,
        start: new Date(event.start).toISOString().slice(0, 16),
        end: new Date(event.end).toISOString().slice(0, 16)
      }
    },
    resetForm() {
      this.currentEvent = null
      this.eventForm = this.getDefaultForm()
    }
  },
  created() {
    this.fetchEvents()
  }
}
</script>

<style scoped>
.color-options {
  display: flex;
  gap: 1rem;
}

.color-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ddd;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s, border-color 0.2s;
}

.color-button:hover {
  transform: scale(1.1);
}

.color-button.active {
  border-color: #333;
  transform: scale(1.1);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.date-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>