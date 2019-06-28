<template>
  <div>
    <h1>{{thisRoom.name}}</h1>
    <ul>
      <li v-for="(player,index) in thisRoom.players" :key="index">{{player.name}}</li>
    </ul>
     <a v-if="thisRoom.players[0].name==username" href="" class="btn btn-info" @click.prevent="readyAction">REaDY</a> 
  </div>
  
</template>
<script>
import db from "@/api/firebaseAPI";
export default {
  data() {
    return {
      thisRoom: {},
      username : localStorage.username
    };
  },
  created() {
    db.collection("rooms")
      .doc(this.$route.params.id)
      .onSnapshot(
        doc => {
          this.thisRoom = doc.data();
          if(this.thisRoom.status==true){
              console.log('masuk sih harusnya')
                this.$router.push(`/game/${this.$route.params.id}`)
          }
        },
        err => {
          console.log(err,'errrrorr dinis');
        }
      );
  },
  methods:{
      readyAction(){
           db.collection('rooms')
          .doc(this.$route.params.id).update({
            status: true,
          })
          .then(() => {
            console.log('playing');
          })
          .catch((error) => {
            console.error('ERROR ==> ', error);
          });
      }
  }
};
</script>