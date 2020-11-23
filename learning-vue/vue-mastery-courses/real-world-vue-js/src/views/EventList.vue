<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" v-bind:key="event.id" v-bind:event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';

export default {
  components: {
    EventCard
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response);
      });
  },
  data() {
    return {
      events: []
    };
  }
};
</script>

<style></style>
