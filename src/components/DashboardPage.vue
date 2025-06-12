<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <StationForm @stationAdded="loadStations" />
    <MapView :stations="stations" />
  </div>
</template>

<script>
import StationForm from './StationForm.vue';
import MapView from './MapView.vue';
import axios from '../axios';

export default {
  components: { StationForm, MapView },
  data() {
    return { stations: [] };
  },
  methods: {
    async loadStations() {
      try {
        const res = await axios.get('/stations');
        this.stations = res.data;
      } catch (err) {
        console.error('Error loading stations:', err);
      }
    }
  },
  mounted() {
    this.loadStations();
  }
};
</script>
