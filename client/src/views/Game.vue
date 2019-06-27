<template>
    <div id="containerGame">
        <div id="headerText">
            <h3>RandomLetter</h3>
            <h5>Stack Your Letters!</h5>
        </div>
         <div v-if="mode == 'win'" id="winnerSection">
             <h3>Congratulation you are the winner!</h3>
             <h4>Your Score: {{player.score}}</h4>
        </div>
        <div v-if="mode == 'end'" id="endSection">
            <h3>The End</h3>
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
                    <div class="card bg-dark" style="margin-left: 30%; margin-top:10%; width:200px">
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
</template>

<script>
export default {
    name:'gamePage',
    data(){
        return {
            mode: 'play',
            isWrong:'',
            player:{
                score: 0
            },
            question: '',
            answerPlayer: '',
            answer: '',
            index:0,
            keyAnswer: ['haus','porsi','daring','jiplak', 'tanjung', 'piranti',
                        'masyhur','swasembada','pramuniaga','ensiklopedia'],
            images:[
                'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2019/02/20/2532982389.jpg',
                'https://www.budgetbytes.com/wp-content/uploads/2018/04/The-Best-Weeknight-Pasta-Sauce-plate-H1.jpg',
                'https://www.thalesgroup.com/sites/default/files/styles/article_card/public/database/d7/e-services_modified_1.jpg?itok=DkaYx8h8',
                'https://www.lifewire.com/thmb/VODNGWu6sSbLmEgV1MPXurJX_3g=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/65-copy-gmail-from-one-account-to-another-57f3f9025f9b586c35006fea.png',
                'https://www.inovasee.com/wp-content/uploads/2016/06/Tanjung-Benoa-758x554.jpg',
                'http://4.bp.blogspot.com/-1OcoLhOD6tk/T36RYtbvodI/AAAAAAAAABw/LSQ74uZTXa8/s1600/piranti-komputer.jpg',
                'https://yt3.ggpht.com/a/AGF-l7-NQdbfxI9mOxPjpTV5NZ34oHC56_TgbLIHAA=s900-mo-c-c0xffffffff-rj-k-no',
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
                this.answerPlayer=''
                if(this.player.score >= 100){
                    this.mode= 'win'
                }
                else if(this.index== 10){
                    this.mode= 'end'
                }
                else{
                    this.getQuestion()
                }
            }else{
                if(this.index == 10){
                    this.mode= 'end'
                }else{
                this.isWrong='Your answer is wrong!'
                this.player.score -=5
                this.getQuestion()
                }
            }
        }

    },
    created(){
        this.getQuestion()
    }
}
</script>

<style scoped>
    #containerGame{
        zoom: 90%;
        text-align: center;
        color: white;
        background-color:#F08B33;
        height: 800px;
        font-family: 'Chewy', sans-serif;
    }

    #headerText{
        color: #4C241D;
        font-size: 20px;
        text-shadow: 1px 1px 0px lightcoral;
    }

    #headerQuestion{
        margin-top: 50px;
        font-size: 35px;
        font-weight: bold;
    }
    #questionSection{
        font-size: 40px;
        font-weight: bold;
        color:#ED7F7F;
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
        color: white;
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
