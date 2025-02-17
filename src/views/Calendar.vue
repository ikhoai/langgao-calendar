<template>
  <div class="calendar-view">
    <!-- <vue-cal
      :events="events"
      :time-from="7 * 60"
      :time-to="22 * 60"
      :disable-views="['years', 'year']"
      style="height: 100vh"
      class="vuecal--green-theme"
      locale="vi"
      :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
      :on-event-create="onEventCreate"
    /> -->
    <vue-cal 
    class="vuecal--blue-theme"
    :events="events"
    locale="vi"
  
    :time-from="7 * 60"
      :time-to="22 * 60"
    ></vue-cal>
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
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`)
      
      // Debug: Log the raw response data
      console.log('Raw API response:', response.data[0])

    
      
      this.events = response.data.map(event => {

         // Create dates and adjust for timezone
         const startDate = new Date(event.start)
        startDate.setHours(startDate.getHours() - 7)
        const endDate = new Date(event.end)
        endDate.setHours(endDate.getHours() - 7)        

        return {
          id: event._id,
          start: startDate,
          end: endDate,
          title: event.title,
          content: event.description,
          class: 'event-class',
          style: {
            backgroundColor: event.color  // Use backgroundColor directly
          },
          // Add this line to explicitly set CSS variable
          cssClass: `vuecal__event--${event._id}`,
          // Add this line as an alternative way to set background
          backgroundColor: event.color
        }
      })
      
      // Debug: Log the transformed events
      console.log('First transformed event:', this.events)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    onEventCreate(event) {
      // Set the background color when event is created
      event.backgroundColor = event.background
      if (event) {
        // Set the CSS variable dynamically
        event.elm.style.setProperty('--event-background-color', event.background)
      }
    }
  },
  mounted() {
    // Add dynamic styles for each event
    this.events.forEach(event => {
      const style = document.createElement('style')
      style.textContent = `
        .vuecal__event--${event.id} {
          background-color: ${event.color} !important;
        }
      `
      document.head.appendChild(style)
    })
  }
}
</script>

<style>
/* Add this to your component */
.vuecal__event {
  /* Make sure events can show background color */
  opacity: 1;
  background-color: rgba(173, 216, 230, 0.5);
}
.vuecal {height: 90vh;}

</style>