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
        
        <div class="form-group">
          <label>Color</label>
          <input type="color" v-model="eventForm.color">
        </div>
        
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
import axios from 'axios'

export default {
  data() {
    return {
      events: [],
      currentEvent: null,
      eventForm: this.getDefaultForm()
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
      return new Date(date).toLocaleString()
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