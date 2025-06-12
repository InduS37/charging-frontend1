<template>
  <div class="dashboard">
    <h2>Charging Stations</h2>

    <StationForm
      :stationToEdit="stationToEdit"
      @stationAdded="loadStations"
      @editComplete="clearEdit"
    />

    <table class="station-table" v-if="stations.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Power Output (kW)</th>
          <th>Connector Type</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in stations" :key="station._id">
          <td>{{ station.name }}</td>
          <td>{{ station.status }}</td>
          <td>{{ station.powerOutput }}</td>
          <td>{{ station.connectorType }}</td>
          <td>{{ station.location.lat }}</td>
          <td>{{ station.location.lng }}</td>
          <td>
            <button @click="editStation(station)">Edit</button>
            <button @click="deleteStation(station._id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <MapView :stations="stations" />

    <button @click="logout" class="logout-button">Logout</button>
  </div>
</template>

<script>
import StationForm from './StationForm.vue';
import MapView from './MapView.vue';
import axios from '../axios';

export default {
  components: { StationForm, MapView },
  data() {
    return {
      stations: [],
      stationToEdit: null
    };
  },
  methods: {
    async loadStations() {
      try {
        const res = await axios.get('/stations');
        this.stations = res.data;
      } catch (err) {
        console.error('Error loading stations:', err);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    async deleteStation(id) {
      try {
        await axios.delete(`/stations/${id}`);
        this.loadStations();
      } catch (err) {
        console.error('Error deleting station:', err);
      }
    },
    editStation(station) {
      this.stationToEdit = station;
    },
    clearEdit() {
      this.stationToEdit = null;
    }
  },
  mounted() {
    this.loadStations();
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}
.station-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.station-table th,
.station-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}
.station-table th {
  background-color: #f0f0f0;
}
button {
  margin-right: 6px;
  padding: 5px 10px;
  cursor: pointer;
}
.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
}
.logout-button {
  margin-top: 20px;
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.logout-button:hover {
  background-color: #0056b3;
}
</style>
