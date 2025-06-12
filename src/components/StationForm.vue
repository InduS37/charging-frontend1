<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h3>{{ isEdit ? 'Edit Station' : 'Add New Station' }}</h3>

    <input v-model="form.name" placeholder="Station Name" required />
    <input v-model.number="form.lat" type="number" placeholder="Latitude" required />
    <input v-model.number="form.lng" type="number" placeholder="Longitude" required />

    <select v-model="form.status" required>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

    <input v-model.number="form.powerOutput" type="number" placeholder="Power Output (kW)" required />
    <input v-model="form.connectorType" placeholder="Connector Type" required />

    <button type="submit">{{ isEdit ? 'Update' : 'Add' }} Station</button>

    <button v-if="isEdit" type="button" class="cancel-btn" @click="cancelEdit">Cancel</button>
  </form>
</template>

<script>
import axios from '../axios';

export default {
  props: ['stationToEdit'],
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
  computed: {
    isEdit() {
      return !!this.stationToEdit;
    }
  },
  watch: {
    stationToEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = {
            name: newVal.name,
            lat: newVal.location.lat,
            lng: newVal.location.lng,
            status: newVal.status,
            powerOutput: newVal.powerOutput,
            connectorType: newVal.connectorType
          };
        } else {
          this.resetForm();
        }
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        name: '',
        lat: '',
        lng: '',
        status: 'active',
        powerOutput: '',
        connectorType: ''
      };
    },
    cancelEdit() {
      this.resetForm();
      this.$emit('editComplete');
    },
    async handleSubmit() {
      try {
        if (this.isEdit) {
          await axios.put(`/stations/${this.stationToEdit._id}`, {
            name: this.form.name,
            location: { lat: this.form.lat, lng: this.form.lng },
            status: this.form.status,
            powerOutput: this.form.powerOutput,
            connectorType: this.form.connectorType
          });
          this.$emit('editComplete');
        } else {
          await axios.post('/stations', {
            name: this.form.name,
            location: { lat: this.form.lat, lng: this.form.lng },
            status: this.form.status,
            powerOutput: this.form.powerOutput,
            connectorType: this.form.connectorType
          });
        }

        this.resetForm();
        this.$emit('stationAdded');
      } catch (err) {
        console.error('Form submission failed:', err);
      }
    }
  }
};
</script>

<style scoped>
.form {
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 10px;
}
input, select {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
}
button {
  margin-right: 10px;
  padding: 8px 14px;
}
.cancel-btn {
  background-color: #ccc;
  border: none;
}
</style>
