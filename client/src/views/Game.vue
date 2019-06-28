<template>
    <div>
    <div id="containerGame">
        <div id="headerText">
            <h3>RandomLetter</h3>
            <h5>Stack Your Letters!</h5>
        </div>
         <div v-if="mode == 'win'" id="winnerSection">
             <h3>Congratulation you are the winner!</h3>
             <h4>Your Score: {{player.score}}</h4>
        </div>
        <div v-if="mode == 'play'" id="boardSection">
            <div class="row">
                <div class="col-sm-5 offset-sm-1" id="hintSection">
                    <h4>Hint:</h4>
                    <img :src="hintImage" class="rounded" alt="Hint Image">
                </div>
                <div class="col-sm-5">
                    <h1 id="headerQuestion">Random Letter:</h1>
                    <div class="card" style="margin-left: 15%; margin-top:10%; width:400px; color:#ED7F7F">
                        <div class="card-body" id="questionSection">{{question}}</div>
                    </div>
                </div>
            </div>
            <div id="score">
                <p>Wrong Answer -5 Point!</p> 
                <h4>Your Score: {{player.score}}</h4>
                <h5>{{isWrong}}</h5>
            </div>
            <form @submit.prevent="checkAnswer">
                <div class="form-group">
                    <input v-model="answerPlayer" type="text" class="form-control" id="answerPlayer" aria-describedby="answerPlayer" placeholder="Your Answer">
                </div>
            </form>
        </div>
    </div>
  
     <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="row mt-5">
                    <div class="col" style=" text-align: center;">
                        <h1 class="animated heartBeat" style="animation-iteration-count: infinite;font-family: 'Baloo Bhai', cursive;">Live Score</h1>
                    </div>
                </div>
                <div class="scoreboard mt-3 animated slideInRight" style="border:1px solid black; background-color: black; color: white; 
                height: 230px; text-align: center;font-family: 'Baloo Bhai', cursive;">
                    <div class="row mt-3">
                        <div class="col">
                            <h1>{{roomData.players[0].name}}</h1>
                        </div>
                        <div class="col">
                            <h1>{{roomData.players[1].name}}</h1>
                        </div>
                        <div class="col">
                            <h1>{{roomData.players[2].name}}</h1>
                        </div>
                        <div class="col">
                            <h1></h1>
                        </div>
                        <div class="col">
                            <h1></h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1>VS</h1>
                        </div>
                    </div>
                    <div class="row" style="text-align:center;font-size: 80px; font-family: 'Orbitron', sans-serif; color: red">
                        <div class="col" style="border-style: solid;border-color: white;">
                            <p>{{roomData.players[0].score}}</p>
                        </div>
                        <div class="col" style="border-style: solid;border-color: white">
                            <p>{{roomData.players[1].score}}</p>
                        </div>
                        <div class="col" style="border-style: solid;border-color: white">
                            <p>{{roomData.players[2].score}}</p>
                        </div>
                        <div class="col" style="border-style: solid;border-color: white">
                            <p></p>
                        </div>
                        <div class="col" style="border-style: solid;border-color: white">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import db from '../api/firebaseAPI';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name:'gamePage',
    data(){
        return {
            mode: 'play',
            isWrong:'',
            roomData:{},
            player:{
                score: 0
            },
            question: '',
            answerPlayer: '',
            answer: '',
            index:0,
            keyAnswer: ['haus',
                        'porsi',
                        'daring',
                        'jiplak',
                        'tanjung',
                        'piranti',
                        'nyamuk',
                        'masyhur',
                        'influenza',
                        'sekretaris',
                        'swasembada',
                        'pramuniaga',
                        'ensiklopedia'],
            images:[
                'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2019/02/20/2532982389.jpg',
                'https://www.budgetbytes.com/wp-content/uploads/2018/04/The-Best-Weeknight-Pasta-Sauce-plate-H1.jpg',
                'https://www.thalesgroup.com/sites/default/files/styles/article_card/public/database/d7/e-services_modified_1.jpg?itok=DkaYx8h8',
                'https://www.lifewire.com/thmb/VODNGWu6sSbLmEgV1MPXurJX_3g=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/65-copy-gmail-from-one-account-to-another-57f3f9025f9b586c35006fea.png',
                'https://www.inovasee.com/wp-content/uploads/2016/06/Tanjung-Benoa-758x554.jpg',
                'http://4.bp.blogspot.com/-1OcoLhOD6tk/T36RYtbvodI/AAAAAAAAABw/LSQ74uZTXa8/s1600/piranti-komputer.jpg',
                'https://media.tabloidbintang.com/files/thumb/56abdb4a68cbf518d097d19c3caf8266.jpg/745',
                'https://yt3.ggpht.com/a/AGF-l7-NQdbfxI9mOxPjpTV5NZ34oHC56_TgbLIHAA=s900-mo-c-c0xffffffff-rj-k-no',
                'https://www.rockandpop.cl/wp-content/uploads/2019/06/influenza-1.jpg',
                'http://sekertarisku.com/wp-content/uploads/2015/05/sekretaris-handal-sekertarisku.png',
                'https://cdn2.tstatic.net/manado/foto/bank/images/anggota-koramil-1303-09bolaang-babinsa-desa-langago_20180910_114003.jpg',
                'https://www.superindo.co.id/karir/lib/images/m_position/7__Pramuniaga_kasir_131.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Persian-encyclopedia.jpg/300px-Persian-encyclopedia.jpg'


            ],
            hintImage:''
        }
    },
    methods:{
        getQuestion(){
            // let indexInput= Math.floor(Math.random() * this.keyAnswer.length)
            this.answerPlayer=''
            let input= this.keyAnswer[this.index]
            this.answer= this.keyAnswer[this.index]
            this.hintImage= this.images[this.index]

            this.question= this.randomLetter(input)
            this.index++
        },
        randomLetter(input){
            let word= input.split('')
            let randomWord= ''
            for(let i=0; i<word.length; i++){
            let rand= Math.floor(Math.random() * word.length)
                randomWord += word[rand]
                word.splice(rand, 1)
                i-=1
                }
            return randomWord
        },
        checkAnswer(){
            this.isWrong=''
            if(this.answer === this.answerPlayer){
                this.player.score += 10
                db.collection('rooms')
                  .doc(this.$route.params.id).get()
                  .then((doc) => {
                  if (doc.exists) {
                    const data = []
                    let playerList = doc.data().players
                    playerList.forEach(element => {
                    if(element.name == localStorage.getItem('username')){
                        element.score += 10
                    }
                    data.push(element)
                });
                  this.$store.dispatch('updateData',{
                  id:this.$route.params.id,
                  data
                  })
                } 
                else {
                  console.log("No such document!");
                }
                }).catch(function(error) {
                  console.log("Error getting document:", error);
                });
                this.answerPlayer=''
                if(this.player.score >= 100){
                    this.mode= 'win'
                }
                else{
                    this.getQuestion()
                }
            }else{
                this.isWrong='Your answer is wrong!'
                this.player.score -=5
                this.getQuestion()
                }
            }
  }, 
  computed:{
    ...mapState(['rooms'])
  },
  created() {
    this.getQuestion();
  },
  mounted(){
    db.collection("rooms")
      .doc(this.$route.params.id)
      .onSnapshot(
        doc => {
          this.roomData = doc.data()
        //   this.player1name = doc.dataç().players[0].name
        //   this.player1score = doc.data().players[0].score
        },
        err => {
          console.log(err,'errrrorr dinis');
        }
      );
  }
};
</script>


<style scoped>
    #containerGame{
        zoom: 90%;
        text-align: center;
        color: white;
        background-color:#ED7F7F;
        height: 800px;
        font-family: 'Chewy', sans-serif;
    }

    #headerText h3{
        color: #4C241D;
        font-size: 40px;
        text-shadow: 1px 1px 0px lightcoral;
    }

    #headerText h5{
        color:  #FACD55;
        font-size: 20px;
    }

    #headerQuestion{
        margin-top: 50px;
        font-size: 35px;
        font-weight: bold;
        color: #FACD55;
    }
    #questionSection{
        font-size: 40px;
        font-weight: bold;
        color:#4C241D;
    }

    form {
        width: 500px;
        height: 150px;
        margin-left: 32%
    }

    img {
        width: 350px;
        height: 250px;
    }

    #hintSection h4{
        color: #FACD55;
        font-weight: bold;
        font-size: 35px;
        margin-top: 30px;
    }

    #score p {
        font-weight: bold;
        color: red
    }

    #score {
        margin-top: 40px;
        color:black
    }

    #winnerSection h3{
        margin-top: 150px;
        color: green;
        font-weight: bold;
        font-size: 50px;
    }

     #winnerSection h4{
        margin-top: 30px;
        color: black;
        font-weight: bold;
        font-size: 40px;
    }

    #endSection h3{
        margin-top: 150px;
        color: red;
        font-weight: bold;
        font-size: 50px;
    }

     #endSection h4{
        margin-top: 30px;
        color: black;
        font-weight: bold;
        font-size: 40px;
    }
</style>