import Vue from 'vue'
import Vuex from 'vuex'
import db from './api/firebaseAPI';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlayer:'',
    rooms:[]
  },
  mutations: {
    register(state,payload){
      state.currentPlayer = payload
    },
    getRooms(state,payload){
      state.rooms = payload
    }
  },
  actions: {
    getAllRoom(context) {
      db.collection('rooms')
        //order by date createdAt
        //.orderBy('createdAt')
        .onSnapshot((docs) => {
          const data = []
          docs.forEach(element => {
            const info = element.data()
            console.log(info)
            // info.id = element.id
            data.push(info)
          });
          context.commit('getRooms', data)
        }, (err) => {
          console.log(err)
        })}
    }
})
