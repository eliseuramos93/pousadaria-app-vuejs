const app = Vue.createApp({
  data(){
    return {
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
      hideReservationDetails: true,
      checkinDate: '',
      checkoutDate: '',
      numberGuests: '',
      reservationPrice: '',
      errors: [],
    }
  },

  methods: {
    async getInns(){
      this.hideInnsList = false;
      this.hideInnDetails = true;
      this.hideRoomsList = true;

      this.currentInnId = '';

      let url = ''
      if(this.searchText) {
        url = `http://localhost:3000/api/v1/inns/?name=${this.searchText}`
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
    }
  }
});

app.mount('#app')