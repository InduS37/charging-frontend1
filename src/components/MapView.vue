<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

export default {
  props: ['stations'],
  mounted() {
    // Fix default marker icon path
    const DefaultIcon = L.icon({
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Create map
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
      if (!this.map || !this.stations) return;
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
