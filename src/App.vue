<template>
  <div id="app">
    <label for="nameInput">名前</label>
    <input type="txt" id="nameInput" v-model="name">
    <label for="nameInput">メッセージ</label>
    <input type="txt" id="nameInput" v-model="message">
    <div>
      <button type="button" class="btn btn-default" @click="sendMessage">
        送信
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
