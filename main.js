const app = Vue.createApp({
  data(){
    return {
      searchText: '',
      innId: '',
      brandName: '',
      averageRating: '',
      description: '',
      policy: '',
      phoneNumber: '',
      streetName: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      listInns: []
    }
  },

  async mounted(){
    this.listResult = await this.getInns()
  },

  methods: {
    async getInns(){
      let response = await fetch('http://localhost:3000/api/v1/inns');
      let data = await response.json();
      
      this.listInns = [];
      data.forEach(item => {
        var inn = new Object();
        inn.brandName = item.brand_name;
        inn.averageRating = item.average_rating;
        inn.description = item.description;
        inn.policy = item.policy;
        inn.phoneNumber = item.phone_number;
        inn.streetName = item.address.street_name;
        inn.number = item.address.number;
        inn.complement = item.address.complement;
        inn.neighborhood = item.address.neighborhood;
        inn.city = item.address.city;
        inn.state = item.address.state;
        inn.zipCode = item.address.zip_code;

        this.listInns.push(inn)
      })
    },
  },

  computed: {
    listResult(){
      if(this.searchText) {
        return this.listInns.filter(inn => {
          return inn.brandName.toLowerCase().includes(this.searchText.toLowerCase());
        })
      } else {
        return this.listInns;
      }
    }
  }
});

app.mount('#app')