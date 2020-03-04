<template>
  <div id="app">
    <label>name :</label>
    <input type="txt" class="nameInput" v-model="name" placeholder="name">
    <br>
    <label>message :</label>
    <input type="txt" class="nameInput" v-model="message" placeholder="message">
    <div>
      <button type="button" class="btn-default" @click="sendMessage">
        send
      </button>
    </div>
    <div>
      <ul>
        <li v-for="(item,key) in list" :key="key">{{item.name}} / {{item.message}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'app',
  data () {
    return {
      list: [],
      name: '',
      message: ''// 送信されたメッセージ
    }
  },
  created () {
    this.listen()
  },
  methods: {
    listen () {
      firebase.database().ref('myBoard/').on('value', snapshot => {
        if (snapshot) {
          const rootList = snapshot.val()
          let list = []
          Object.keys(rootList).forEach((val, key) => {
            rootList[val].id = val
            list.push(rootList[val])
          })
          this.list = list
        }
      })
    },
    sendMessage () {
      if (!this.name || !this.message) return
      firebase.database().ref('myBoard/').push({
        name: this.name,
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>
<style scoped>
.nameInput{
  font-weight: bold;
  border: solid 1px #000000;
  border-radius: 4px;
}
.btn-default{
  position: relative;
  display: inline-block;
  padding: 0.25em 0.5em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
  text-shadow: 0 1px 0 rgba(0,0,0,0.2);
}

</style>
