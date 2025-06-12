<template>
  <div id="map" style="height: 400px;"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: ['stations'],
  mounted() {
    this.map = L.map('map').setView([20, 78], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.renderMarkers();
  },
  watch: {
    stations: 'renderMarkers'
  },
  methods: {
    renderMarkers() {
      if (!this.map) return;
      this.stations.forEach(station => {
        L.marker([station.location.lat, station.location.lng])
          .addTo(this.map)
          .bindPopup(`
            <b>${station.name}</b><br>
            ${station.status}<br>
            ${station.powerOutput} kW<br>
            ${station.connectorType}
          `);
      });
    }
  }
};
</script>
