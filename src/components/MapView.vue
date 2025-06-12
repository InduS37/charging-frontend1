<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix missing marker icons
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

export default {
  props: ['stations'],
  data() {
    return {
      map: null
    };
  },
  mounted() {
    // Set default Leaflet marker icon
    const DefaultIcon = L.icon({
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Initialize map
    this.map = L.map('map').setView([20, 78], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.renderMarkers();
  },
  watch: {
    stations: {
      immediate: true,
      handler() {
        this.renderMarkers();
      }
    }
  },
  methods: {
    renderMarkers() {
      if (!this.map || !this.stations || this.stations.length === 0) return;

      // Clear previous markers (optional)
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Add new markers
      this.stations.forEach(station => {
        L.marker([station.location.lat, station.location.lng])
          .addTo(this.map)
          .bindPopup(`
            <b>${station.name}</b><br>
            Status: ${station.status}<br>
            Power: ${station.powerOutput} kW<br>
            Connector: ${station.connectorType}
          `);
      });
    }
  }
};
</script>

<style scoped>
.map-container {
  height: 400px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
