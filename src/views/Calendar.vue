<template>
  <div class="calendar-view">
    <vue-cal
      :events="events"
      :time-from="7 * 60"
      :time-to="22 * 60"
      :disable-views="['years', 'year']"
      style="height: 100vh"
      class="vuecal--green-theme"
      locale="vi"
    />
  </div>  
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios'

export default {
  components: { VueCal },
  data() {
    return {
      events: []
    }
  },
  async created() {
   try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`)
      console.log('Raw events from API:', response.data) // Add this
      
      // Transform the data to match vue-cal format
      this.events = response.data.map(event => ({
        id: event._id,
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.title,
        content: event.description,
        class: 'event-class', // Optional styling class
        background: event.color
      }))
      
      console.log('Transformed events:', this.events) // Add this
  } catch (error) {
    console.error(error)
  }
}
}
</script>
