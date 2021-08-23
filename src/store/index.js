import { reactive } from 'vue';

const store = {
  debug: false,
  state: reactive({
    date: null,
    user: {
      email: null,
      sync: false
    },
    isAuthenticated: true
  }),
  setIsAuthenticated (newValue) {
    if (this.debug) console.log(`setIsAuthenticated is trigerred with ${newValue}`);
    this.state.isAuthenticated = newValue;
  },
  setUser (newValue) {
    if (this.debug) {
      console.log(`setUser is trigerred with : `);
      console.log(newValue);
    }
    this.state.user = {...newValue};
  },
  setDate (newValue) {
    if (this.debug) {
      console.log(`setDate is trigerred with : `);
      console.log(newValue);
    }
    this.state.date = newValue;
  }
}

export default store;