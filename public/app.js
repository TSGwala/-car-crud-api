function carApp() {
    return {
        cars: [],
        newCar: {
            color: '',
            make: '',
            model: '',
            reg_number: ''
        },
        updateCar: {
            reg_number: '',
            color: '',
            make: '',
            model: ''
        },
        deleteRegNumber: '',

        async fetchCars() {
            try {
                const response = await axios.get('/api/cars');
                this.cars = response.data;
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        },

        async addCar() {
            try {
                const response = await axios.post('/api/cars', this.newCar);
                this.cars.push(response.data);
                this.newCar = { color: '', make: '', model: '', reg_number: '' };
            } catch (error) {
                console.error('Error adding car:', error);
            }
        },

        async updateCarDetails() {
            try {
                const response = await axios.put(`/api/cars/${this.updateCar.reg_number}`, this.updateCar);
                const index = this.cars.findIndex(car => car.reg_number === this.updateCar.reg_number);
                if (index !== -1) {
                    this.cars[index] = response.data;
                }
                this.updateCar = { reg_number: '', color: '', make: '', model: '' };
            } catch (error) {
                console.error('Error updating car:', error);
            }
        },

        async deleteCar() {
            try {
                await axios.delete(`/api/cars/${this.deleteRegNumber}`);
                this.cars = this.cars.filter(car => car.reg_number !== this.deleteRegNumber);
                this.deleteRegNumber = '';
            } catch (error) {
                console.error('Error deleting car:', error);
            }
        }
    };
}
