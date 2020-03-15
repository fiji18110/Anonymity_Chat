<template>
  <div id="app">
    <div class="head" v-if="this.show">
      <label>message</label>
      <input type="text" class="nameInput" v-model="message" placeholder="message">
      <div>
        <b-button size="sm" class="btn-default" @click="sendMessage">
          send
        </b-button>
        <b-button size="sm" class="btn-default" @click="doLogout">
          ログアウト
        </b-button>
      </div>
    </div>
    <div class="head" v-else>
      <b-button size="sm" class="btn-default" @click="doLogin">
          ログイン
      </b-button>
    </div>
    <div>
      <ol class="list_wrap">
        <li class="summary" v-for="(item,key) in list" :key="key">
          <span>{{item.name}}</span>
          <br>
          <span class="message_summary">{{item.message}}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'app',
  data () {
    return {
      user: {},
      name: '',
      list: [],
      message: '',
      show: false
    }
  },
  created () {
    this.user = firebase.auth().currentUser
    this.listen()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.show = true
      } else {
        this.show = false
      }
    })
  },
  methods: {
    onAuthStateChanged () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.show = true
        } else {
          this.show = false
        }
      })
    },
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
      if (!this.message) return
      firebase.database().ref('myBoard/').push({
        name: this.getUserName(),
        message: this.message
      })
      this.message = ''
    },
    getUserName () {
      return firebase.auth().currentUser.displayName
    },
    doLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    doLogout () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style scoped>
.nameInput{
  font-weight: bold;
  border: solid 1px #000000;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-default{
  position: relative;
  display: inline-block;
  padding: 0.25em 0.5em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
  text-shadow: 0 1px 0 rgba(0,0,0,0.2);
  margin-bottom: 1px;
}
.list_wrap{
  list-style:  none;
  margin-top:  70px;
  padding: 0;
}
.summary:before {
    content:  "";
    width: 20px;
    height: 20px;
    display:  inline-block;
    background-color: #0074bf;
    position:  relative;
    top: 3px;
    border-radius:  50%;
    margin-right: 5px;
}
.summary{
    padding:  10px;
    background-color:  #65ace4;
    border-radius:  10px;
    margin-bottom: 5px;
    color: #fff;
    font-size:  16px;
}
.message_summary{
  margin-left: 50px;
}
.head{
  display: block;
  background: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 100;
}
</style>
