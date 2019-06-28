import Vue from 'vue'
import Vuex from 'vuex'
import db from './api/firebaseAPI';
import router from './router' 

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
        .orderBy('createdAt')
        .onSnapshot((docs) => {
          const data = []
          docs.forEach(element => {
            const info = element.data()
            info.id = element.id
            data.push(info)
          });
          context.commit('getRooms', data)
        }, (err) => {
          console.log(err)
        })},
     createRoom(context, roomName) {
          console.log('db masuk')
          db.collection('rooms')
            .add({
              name: roomName,
              players: [{ name: localStorage.getItem('username'), score: 0 }],
              winner: '',
              createdAt: new Date(),
              status:false
            })
            .then((docs) => {
              console.log(docs)
              console.log(docs._key.path.segments[1])
              localStorage.setItem('idRoom', docs._key.path.segments[1])
              router.push(`/waiting/${docs._key.path.segments[1]}`)
              context.dispatch('getAllRoom')
            })
            .catch((err) => {
              console.log(err)
            })
    },
    joinRoom(context,roomId){
      console.log(roomId)
      let newPlayers = []
      const room = context.state.rooms.find(room => room.id === roomId)
      newPlayers = room.players
      if (newPlayers.length < 3) {
        newPlayers.push({ name: context.state.currentPlayer, score: 0 })
        db.collection('rooms')
        .doc(roomId)
        .update({
          players: newPlayers,
        })
        .then(() => {
          context.dispatch('getAllRoom')
          console.log(roomId,'=====================')
          router.push(`/waiting/${roomId}`)
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        Vue.swal('Maaf Room Ini Sudah Penuh');
      }     
    },
    updateData(context,payload){
      db.collection('rooms')
          .doc(payload.id).update({
            players: payload.data,
          })
          .then(() => {
            console.log('yihaaa');
            context.dispatch('getAllRoom')
          })
          .catch((error) => {
            console.error('ERROR ==> ', error);
          });
    }
    }
})
