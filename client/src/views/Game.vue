<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h3>{{question}}</h3>
                <h5>{{player.score}}</h5>
            </div>
        </div>
        <form @submit.prevent="checkAnswer">
            <div class="form-group">
                <input v-model="answerPlayer" type="text" class="form-control" id="answerPlayer" aria-describedby="answerPlayer" placeholder="Your Answer">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name:'gamePage',
    data(){
        return {
            player:{
                score: 0
            },
            question: '',
            answerPlayer: '',
            answer: '',
            index:0,
            keyAnswer: ['vue','haus','porsi','duduk','bunga','daring','jiplak',
                        'sepatu','kamus', 'derau', 'piranti', 'piranti',
                        'firebase','hacktiv','narahubung','ensiklopedia']
        }
    },
    methods:{
        getQuestion(){
            // let indexInput= Math.floor(Math.random() * this.keyAnswer.length)
            let input= this.keyAnswer[this.index]
            this.answer= this.keyAnswer[this.index]

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
             if(this.player.score == 100){
                this.question= 'You are the winner'
                }
            else if(this.answer === this.answerPlayer){
                this.player.score += 10
                this.answerPlayer=''
                this.getQuestion()
            }else{
                this.question='Your answer is wrong!'
            }
        }

    },
    created(){
        this.getQuestion()
    }
}
</script>

<style>

</style>
