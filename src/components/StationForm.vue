<template>
  <form @submit.prevent="submitStation">
    <input v-model="form.name" placeholder="Station Name" required />
    <input v-model.number="form.lat" placeholder="Latitude" type="number" required />
    <input v-model.number="form.lng" placeholder="Longitude" type="number" required />
    <select v-model="form.status" required>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
    <input v-model.number="form.powerOutput" placeholder="Power Output (kW)" type="number" required />
    <input v-model="form.connectorType" placeholder="Connector Type" required />
    <button type="submit">Add Station</button>
  </form>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      form: {
        name: '',
        lat: '',
        lng: '',
        status: 'active',
        powerOutput: '',
        connectorType: ''
      }
    };
  },
  methods: {
    async submitStation() {
      try {
        const newStation = {
          name: this.form.name,
          location: { lat: this.form.lat, lng: this.form.lng },
          status: this.form.status,
          powerOutput: this.form.powerOutput,
          connectorType: this.form.connectorType
        };
        await axios.post('/stations', newStation);
        this.$emit('stationAdded');
        this.form = {
          name: '', lat: '', lng: '', status: 'active', powerOutput: '', connectorType: ''
        };
      } catch (err) {
        console.error('Error adding station:', err);
      }
    }
  }
};
</script>
