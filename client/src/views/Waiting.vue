<template>
    <div class="container-landing py-5">
        <div class="row">
            <div class="col-sm-12 col-12 row">
                <div class="main-heading col-sm-12"> {{roomName}}
                    <p class="main-subheading">{{createdAt}}</p>
                </div>
                <div class="container col-sm-4 col-2" style="margin-top: 1%;">
                    <img src="https://image.flaticon.com/icons/svg/1792/1792923.svg" alt="pomeranian"/>
                </div>
                <div class="container col-sm-4 col-10" style="max-height: 650px; overflow: scroll; margin-top: 1%;">
                    <div class="card" v-for="player in 3" :key="player">
                        <div class="card-body">
                            <h2 class="card-text">{{player}}</h2>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-text">{{player}}</h2>
                            <a @click="changeReady" class="fas fa-check fa-2x" style="width: 100%; background-color: rgba(255,255,255,0)" v-show="!isReady" />
                            <p class="card-text" v-show="!isReady">Not Ready</p>
                            <a @click="changeReady" class="fas fa-check fa-2x" style="width: 100%; background-color: rgba(255,255,255,0)" v-show="isReady" />
                            <p class="card-text" v-show="isReady">Ready</p>
                        </div>
                    </div>
                </div>
                <div class="container col-sm-4" style="margin-top: 1%;">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'waitingPage',
    data() {
        return {
            roomName: 'CIMB',
            createdAt: '2 mins ago',
            players: [],
            isReady: false
        }
    },
    methods:{
        changeReady() {
            if (this.isReady === true) {
                this.isReady = false 
            } else { 
                this.isReady = true
            }
        }
    },
    created(){
    }
}
</script>

<style scoped>
 .container-landing {
    text-align: center;
    color: white;
    background-color:lightcoral; 
    height: 100vh;
    width: 100vw;
    font-size: 14px;
    font-family: 'Chewy', sans-serif;
  }

  .card {
    background-color: #FBE8DB;
    color: #4C241D;
    margin-top: 2%;
    margin-bottom: 2%;
    max-height: 80px;
  }

  h2.card-text {
      float: left;
  }

  .icon-text {
      float: right;
  }
  
  .main-heading {
    font-size: 3rem;
    text-shadow: 1px 1px 0px rgba(60,17,24,1);
  }

  .main-subheading {
    font-size: 1.3rem;
    margin-top: -1%;
    text-shadow: 1px 1px 0px rgba(60,17,24,1);
  }
</style>
