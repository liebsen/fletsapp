<template>
  <section class="hero">
    <div class="has-background-white">
      <div class="container has-text-left">
        <h2 class="title">
          <span>📧 Contacto</span>
        </h2>
      </div>
    </div>   
    <div class="hero-body">
      <div class="container">
        <form class="form has-text-left" @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <div class="field is-horizontal" v-if="!token().token">
                <div class="field-body">
                  <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                      <input class="input" name="first_name" type="text" placeholder="John" autofocus required>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                      <input class="input" type="text" name="last_name" placeholder="Doe" required>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field" v-if="!token().token">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" name="email" placeholder="johndoe@gmail.com" autofocus required>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Your comments</label>
                <div class="control">
                  <textarea name="comment" class="textarea is-success" placeholder="Please explain briefly how can we help you." required></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="acceptTerms">
                I agree to the <a href="/privacy">Privacy Policies</a>
              </label>
            </div>
          </div>

          <div class="field" v-if="message && message.length">
            <p class="help" :class="messageType" v-html="message"></p>
          </div>

          <div class="field">
            <div class="control ">
              <button type="submit" class="button is-link is-medium is-fullwidth" :class="{'is-loading' : loading}">Send</button>
            </div>
          </div>    
          <!--div class="field">
            <div class="control" v-if="!token().token">
              <a href="/sign-in" class="button is-text">Send as registered account</a>
            </div>
          </div-->

        </form>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'contact',
  data () {
    return {
      msg: 'Welcome to JetsBooking'
    }
  }
}
</script>
