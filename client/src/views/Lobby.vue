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
  </div>
</template>

<script>
export default {};
</script>
