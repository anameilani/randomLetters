<template>
  <div class="container-landing py-5">
    <div class="row">
      <div class="col-sm-12">
        <div class="main-heading">RandomLetter</div>
        <img class="pompom" src="https://image.flaticon.com/icons/svg/1792/1792923.svg" alt="pomeranian"/>
        <ul class="desc">
          <li>Play.</li>
          <li>With.</li>
          <li>Your.</li>
          <li>Friends.</li>
        </ul>
        <div class="container">
            <form @submit.prevent="register">
            <div class="form-group">
              {{username}}
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Input Your Name" v-model="username">
            </div>
            <button type="button" class="btn btn-warning btn-lg" @click="register">Start</button>
            </form>
        </div> 
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      username:''
    }
  },
  methods:{
     register(){
       localStorage.setItem('username',this.username)
       this.$store.commit('register',this.username)
       this.$store.dispatch('getAllRoom')
       this.username = ''
       this.$router.push('/lobby')
    }
  }
}
</script>

<style scoped>
  .container-landing {
    zoom: 90%;
    text-align: center;
    color: white;
    background-color:lightcoral;
    height: 800px;
    font-size: 14px;
    font-family: 'Chewy', sans-serif;
  }
  
  .main-heading {
    font-size: 5rem;
    /* border-bottom: 0.8rem dotted white; */
    /* padding: 1rem 0 3rem; */
    text-shadow: 1px 1px 0px rgba(60,17,24,1);
  }
  
  .top-row {
    margin-bottom: 4rem;
    padding: 2rem 0;
    border-bottom: 0.8rem dotted #F1EDE2;
  }
  
  .desc {
      text-shadow: 1px 1px 0px rgba(60,17,24,1);
    text-align: center;
    font-size: 2.7rem;
    padding-left: 0;
  }
  
  .desc li {
    display: inline-block;
  }
  
  ol {
    text-align: left;
    padding-left: 0;
    list-style-type: none;
    counter-reset: fact-counter;
    font-size: 2.5rem;
    color: #000;
    text-shadow: 0px;
    background-color: #F1EDE2;
    border-radius: 0.3em;
  }
  
  ol li {
    padding: 1rem;
    position: relative;
    padding-left: 2.5em;
    margin: 1em 0.5em;
  }
  
  ol li:before {
    content: counter(fact-counter);
    counter-increment: fact-counter;
    text-shadow: 0px 0px 0px;
    color: #000;
    margin: 0;
    border-radius: 50%;
    float: left;
    font-size: 4.5rem;
    position: absolute;
      left: 0;
      top: 0;
  }
  
  .pompom {
    margin: 1rem auto 1rem;
    width: 19rem;
    height: 19rem;
    -webkit-filter: drop-shadow(5px 5px 5px rgba(60,17,24,1));
    filter: drop-shadow(0.8rem 5px 0px rgba(60,17,24,1));
  }
  
  .read-more-btn, 
  .read-more-btn:active, 
  .read-more-btn:visited {
    display: block;
    height: 50px;
    width: 200px;
    font-size: 3em;
    margin: 1em auto;
    padding: 0.5em 1.5em;
    color: #F1EDE2;
    background-color: #000;
    border-radius: 0.3em;
  }
  
  .read-more-btn:hover {
    color: #000;
    background-color: #F1EDE2;
    text-decoration: none;
  }
  
  @media (max-width: 765px) {
    ol {
      border-radius: 0;
      padding-top: 0.2em;
    }
  }
</style>



