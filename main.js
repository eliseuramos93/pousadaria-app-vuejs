const app = Vue.createApp({
  data(){
    return {
      // getCities data
      listCities: [],

      // getInns data
      searchText: '',
      listInns: [],
      hideInnsList: true,
      
      // showInnDetails data
      hideInnDetails: true,
      brandName: '',
      averageRating: '',
      description: '',
      policy: '',
      phoneNumber: '',
      petFriendly: '',
      streetName: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',

      // getRooms data
      hideRoomsList: true,
      currentInnId: '',
      listRooms: [],

      // checkRoomAvailability data
      currentRoomId: '',
      hideReservationDetails: true,
      checkinDate: '',
      checkoutDate: '',
      numberGuests: '',
      reservationPrice: '',
      errors: [],
    }
  },

  async mounted() {
    this.listCities = await this.getCities();
  },

  methods: {
    async getCities(){
      let response = await fetch('http://localhost:3000/api/v1/inns/city_list')
      let data = await response.json();

      return data;
    },

    async getInns(city = ''){
      this.hideInnsList = false;
      this.hideInnDetails = true;
      this.hideRoomsList = true;
      this.hideReservationDetails = true;

      this.currentInnId = '';

      let url = ''
      if(this.searchText && city) {
        url = `http://localhost:3000/api/v1/inns/?name=${this.searchText}&city=${city}`
      } else if(this.searchText) {
        url = `http://localhost:3000/api/v1/inns/?name=${this.searchText}`
      } else if(city) {
        url = `http://localhost:3000/api/v1/inns/?city=${city}`
      } else {
        url = `http://localhost:3000/api/v1/inns/`
      }

      let response = await fetch(url);
      let data = await response.json();
      
      this.listInns = [];
      data.forEach(item => {
        var inn = new Object();
        inn.id = item.id;
        inn.name = item.brand_name;

        this.listInns.push(inn)
      })
    },

    async getInnDetails(innId){
      this.hideInnsList = true;
      this.hideInnDetails = false;

      let response = await fetch(`http://localhost:3000/api/v1/inns/${innId}/`)
      let data = await response.json();
      
      this.currentInnId = innId
      this.brandName = data.brand_name;
      this.averageRating = data.average_rating;
      this.description = data.description;
      this.policy = data.policy;
      this.phoneNumber = data.phone_number;
      this.petFriendly = data.pet_friendly
      this.streetName = data.address.street_name;
      this.number = data.address.number;
      this.complement = data.address.complement;
      this.neighborhood = data.address.neighborhood;
      this.city = data.address.city;
      this.state = data.address.state;
      this.zipCode = data.address.zip_code;
    },

    async getRooms(innId){
      this.hideRoomsList = false;

      let response = await fetch(`http://localhost:3000/api/v1/inns/${innId}/rooms`)
      let data = await response.json();

      this.listRooms = [];
      data.forEach(item => {
        var room = new Object();
        room.id = item.id;
        room.name = item.name;
        room.description = item.description;
        room.area = item.area
        room.maxCapacity = item.max_capacity;
        room.rentPrice = item.rent_price;
        room.hasBathroom = item.has_bathroom;
        room.hasBalcony = item.has_balcony;
        room.hasAirConditioner = item.has_air_conditioner;
        room.hasTV = item.has_tv;
        room.hasWardrobe = item.has_wardrobe;
        room.hasVault = item.has_vault;
        room.isAccessible = item.is_accessible;

        this.listRooms.push(room)
      });
    },

    async checkRoomAvailability(roomId){
      this.hideReservationDetails = false;

      let base_url = `http://localhost:3000/api/v1/rooms/${roomId}/check_availability/`;
      let params = `?start_date=${this.checkinDate}&end_date=${this.checkoutDate}&number_guests=${this.numberGuests}`;
      let full_url = base_url + params;

      let response = await fetch(full_url, {method: "POST"});
      let data = await response.json();

      this.reservationPrice = '';
      this.errors = [];
      if(data.price) {
        this.reservationPrice = data.price
      } else {
        this.errors = data.errors
      }
    },

    showReservationForm(roomId){
      this.currentRoomId = roomId;
      this.checkinDate = '';
      this.checkoutDate = '';
      this.numberGuests = '';
      this.hideReservationDetails = true;
    }
  }
});

app.mount('#app')