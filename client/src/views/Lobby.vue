<template>
  <div class="container">
    <h1 class="display-4" id="title" data-heading="TeB4k Tok0h">
      <span data-heading="random letter">random letterss</span>
    </h1>
    <p class="text-center">Create or join room to get started.</p>
    <!-- Button trigger modal -->
    <div class="text-center">
      <button
        type="button"
        class="btn green ml-2"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        <img
          src="https://www.pinclipart.com/picdir/middle/0-5183_cartoon-house-clip-art-clipartsco-button-home-cartoon.png"
          height="60px"
        >
      </button>
    </div>

          <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Create New Room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="registerRoom">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Room Name:</label>
                  <input type="text" class="form-control" v-model="roomName">
                </div>
              </form>
            </div>           
             <button type="button" class="btn button purple" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>

      <div class="mt-5 row justify-content-between">
        <div class="col-lg-3 mx-2 mb-3" v-for="(room, index) in rooms" :key="index">
          {{rooms}}
          <div class="card text-center shadow-sm bg-white rounded" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{ room.name }}</h5>
              <h4 class="card-text">{{ room.players.length}}/3</h4>
              <a href="#" class="btn yellow mt-2 disabled" v-if="room.players.length === 5">Full</a>
              <a href="" class="btn blue mt-2" v-else @click.prevent="join(room.id)" ><img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F12%2F21%2F23%2F54%2Fdoor-576282_960_720.png&f=1" width="146px"></a>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name:'Lobby',
  data(){
    return{
      roomName:'',
    }
  },
  created(){
    this.$store.dispatch('getAllRoom');
  },
  computed:{
    ...mapState(['rooms'])
  },
  methods:{
    registerRoom(){
      this.$store.dispatch('createRoom', this.roomName);
      localStorage.setItem('room', this.roomName);
      console.log("masuk create room");
      $('#exampleModalCenter').modal('toggle')
    },
    join(roomId) {
      this.$store.dispatch('joinRoom', roomId);
    },
  }
};
</script>
