<template>
  <div class="grid-rows-1">
    <div class="containerChat grid flex justify-center grid-cols-10 gap-2 my-16">
      <div class="left col-start-2 col-span-3">
        <div class="border-transparent space-x-0 relative rounded-xl rounded-r-none overflow-y-auto my-3 h-screen">
          <div
            :class="{ 'relative shadow-lg h-screen overflow-hidden bg-slate-800': flagModeDark, 'relative bg-white shadow-lg h-screen overflow-hidden ring-1 ring-slate-900/5': !flagModeDark }">
            <div :class="{
              'absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-200 bg-slate-700/90 ring-black/10': flagModeDark,
              'absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 bg-slate-50/90 backdrop-blur-sm ring-1 ring-slate-900/10': !flagModeDark
            }">
              <div class="flex space-x-1 text-2xl">
                <div>Chats</div>
                <div>
                  <span class="relative flex h-2 w-2">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                </div>
              </div>
            </div>
            <div
              :class="{ 'my-14 flex flex-col divide-y h-screen divide-slate-200/5': flagModeDark, 'my-14 flex flex-col divide-y h-screen': !flagModeDark }">
              <ul class="groupUsers">
                <li class="invisible person flex items-center gap-4 p-4 " data-chat="person-1">
                </li>
                <div v-for="(user, index) in users" :key="user.id">
                  <li :class="`person flex items-center gap-4 p-4 userChat-${index}`" :data-chat="`person${index}`"
                    @click="getClient(user.name, index)">
                    <vue-avatar :username="user.name" class="w-12 h-12 rounded-full" />
                    <div class="name invisible"></div>
                    <strong
                      :class="{ 'text-md font-medium text-slate-200': flagModeDark, 'text-slate-900 text-md font-medium': !flagModeDark }">
                      {{ user.name }}
                    </strong>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="right col-start-5 col-span-6 col-end-10" ref="chatArea">
        <div class="border-transparent space-x-0 relative rounded-xl my-3">
          <div
            :class="{ 'border-transparent relative rounded-xl rounded-l-none shadow-lg h-screen overflow-hidden bg-slate-800': flagModeDark, 'border-transparent relative rounded-xl rounded-l-none bg-white shadow-lg h-screen overflow-hidden': !flagModeDark }">
            <div :class="{
              'absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-200 bg-slate-700/90 ring-black/10': flagModeDark,
              'absolute top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 bg-slate-50/90 backdrop-blur-sm ring-1 ring-slate-900/10': !flagModeDark
            }">
              <div class="top flex space-x-1 text-2xl">
                <div class="name">{{ htmlNameContent }}</div>
                <div>
                  <span class="relative flex h-2 w-2">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div class="chat" data-chat="person-1">
              </div>
              <div class="chat" data-chat="person0">
                <div class="my-16 overflow-auto">
                  <div class="overflow-hidden">
                    <div
                      :class="{ 'overflow-y-scroll grid-rows-[auto,repeat(16,50px)] max-h-[35rem] bg-slate-800 ring-1 ring-slate-900/5 shadow-xl': flagModeDark, 'overflow-y-scroll grid-rows-[auto,repeat(16,50px)] max-h-[35rem] bg-white ring-1 ring-slate-900/5 shadow-xl': !flagModeDark }">
                      <div class="conversation-start">
                        <span
                          :class="{ 'text-sm font-medium text-slate-200': flagModeDark, 'text-slate-900 text-sm font-medium': !flagModeDark }">
                          Hoy</span>
                      </div>

                      <div v-for="chatMessage in chatOne" :key="chatMessage.id">
                        <div
                          :class="{ 'bubble me': chatMessage.message.typeUser == 'UserSystem', 'bubble you': chatMessage.message.typeUser !== 'UserSystem' }">
                          <div v-if="chatMessage.message.type == 'text'">
                            {{ chatMessage.message.text }}
                          </div>
                          <div v-else-if="chatMessage.message.type == 'image'">
                            <div class="bg-transparent">
                              <img class="object-scale-down h-2/4 w-12" :src="`${chatMessage.message.multimedia.file}`">
                            </div>
                          </div>
                          <div v-else-if="chatMessage.message.type == 'document'">
                            <div class="bg-transparent">
                              <a :href="`${chatMessage.message.multimedia.file}`" target="_blank">
                                <font-awesome-icon icon="file-pdf" class="fa-3x text-center text-red-600" />
                              </a>
                            </div>
                          </div>
                          <div v-else-if="chatMessage.message.type == 'video'">
                            <div class="bg-transparent">
                              <iframe class="w-full aspect-video"
                                :src="`${chatMessage.message.multimedia.file}`"></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat" data-chat="person1">
                <div class="my-16 overflow-auto">
                  <div class="overflow-hidden">
                    <div
                      :class="{ 'overflow-y-scroll grid-rows-[auto,repeat(16,50px)] max-h-[35rem] bg-slate-800 ring-1 ring-slate-900/5 shadow-xl': flagModeDark, 'overflow-y-scroll grid-rows-[auto,repeat(16,50px)] max-h-[35rem] bg-white ring-1 ring-slate-900/5 shadow-xl': !flagModeDark }">
                      <div class="conversation-start">
                        <span
                          :class="{ 'text-sm font-medium text-slate-200': flagModeDark, 'text-slate-900 text-sm font-medium': !flagModeDark }">
                          Hoy</span>
                      </div>

                      <div v-for="chatMessage in chatTwo" :key="chatMessage.id">
                        <div
                          :class="{ 'bubble me': chatMessage.message.typeUser == 'UserSystem', 'bubble you': chatMessage.message.typeUser !== 'UserSystem' }">
                          <div v-if="chatMessage.message.type == 'text'">
                            {{ chatMessage.message.text }}
                          </div>
                          <div v-else-if="chatMessage.message.type == 'image'">
                            <div class="bg-transparent">
                              <img class="object-scale-down h-2/4 w-12" :src="`${chatMessage.message.multimedia.file}`">
                            </div>
                          </div>
                          <div v-else-if="chatMessage.message.type == 'document'">
                            <div class="bg-transparent">
                              <a :href="`${chatMessage.message.multimedia.file}`" target="_blank">
                                <font-awesome-icon icon="file-pdf" class="fa-3x text-center text-red-600" />
                              </a>
                            </div>
                          </div>
                          <div v-else-if="chatMessage.message.type == 'video'">
                            <div class="bg-transparent">
                              <iframe class="w-full aspect-video"
                                :src="`${chatMessage.message.multimedia.file}`"></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              :class="{ 'static input-container mx-2 my-3 invisible': applyClass, 'static input-container mx-2 my-3': !applyClass }">
              <div class="absolute left-3 bottom-3 right-3 flex gap-2">
                <div class="w-screen">
                  <input class="inputMessage" type="text" id="inputValue" v-model="inputValue" placeholder="Mensaje">
                </div>
                <div class="w-1/6 mt-1">
                  <button id="btnValue" class="input-button bg-sky-300 bg-sky-300/50 rounded-full"
                    @click="sendMessageToClient()"><font-awesome-icon icon="paper-plane" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, computed } from "vue";
import VueAvatar from "@webzlodimir/vue-avatar";
import "@webzlodimir/vue-avatar/dist/style.css";

export default {
  props: {
    nameClient: String,
    flagModeDark: Boolean
  },
  components: {
    VueAvatar
  },
  data() {
    return {
      inputValue: '',
      htmlNameContent: '. . .',
      applyClass: true
    };
  },
  setup() {
    const store = useStore();

    const getUsers = computed(() => {
      return store.getters.getUsers;
    });

    const users = computed(() => {
      return store.state.users;
    });

    const chatOne = computed(() => {
      return store.state.chatByUser1;
    });

    const chatTwo = computed(() => {
      return store.state.chatByUser2;
    });

    onMounted(() => {
      store.dispatch("fetchUsers");
      store.dispatch("fetchChatByUser1");
      store.dispatch("fetchChatByUser2");
    });

    function getContentChatByClient(id) {
      switch (id) {
        case '629a8125b2d313190810212f':
          return store.state.chatByUser1;
        case '629e39e8b2d31319081e0650':
          return store.state.chatByUser2;
        default:
          return [store.state.chatByUser1, store.state.chatByUser2];
      }
    }

    return {
      getContentChatByClient,
      getUsers,
      users,
      chatOne,
      chatTwo
    };
  },
  methods: {
    getClient(auxNameChat, auxId) {
      this.htmlNameContent = auxNameChat;
      let auxOtherIndex = (auxId == 0) ? 1 : 0;

      this.applyClass = false;

      document.querySelector('.person[data-chat=person' + auxId + ']').classList.add('active')
      document.querySelector('.person[data-chat=person' + auxOtherIndex + ']').classList.remove('active')

      document.querySelector('.chat[data-chat=person' + auxId + ']').classList.add('active-chat')
      document.querySelector('.chat[data-chat=person' + auxOtherIndex + ']').classList.remove('active-chat')
    },
    sendMessageToClient() {
      let auxClient = '';
      let arrayClients = {
        list: document.querySelector('ul.groupUsers'),
        all: document.querySelectorAll('.left .person'),
        name: ''
      };

      arrayClients.all.forEach(f => {
        if (f.classList.contains('active')) {
          auxClient = f.getAttribute('data-chat');
        }
      });

      if (auxClient === 'person1') {
        // ChatTwo
        let auxObject = {
          "_id": "62e9569f8150bb68b0aff926",
          "type": "Message",
          "client": "629e39e8b2d31319081e0650",
          "message": {
            "_id": "62e9569f8150bbb5d5aff925",
            "type": "text",
            "text": this.inputValue,
            "typeUser": "UserSystem"
          }
        };

        this.chatTwo.push(auxObject)
      } else {
        // ChatOne
        let auxObject = {
          "_id": "62e9569f8150bb68b0aff926",
          "type": "Message",
          "client": "629a8125b2d313190810212f",
          "message": {
            "_id": "62e9569f8150bbb5d5aff925",
            "type": "text",
            "text": this.inputValue,
            "typeUser": "UserSystem"
          }
        };

        this.chatOne.push(auxObject)
      }

      this.inputValue = ''

      this.$nextTick(() => {
        this.$refs.chatArea

        /* document.querySelector('.chat[data-chat=person-1]').classList.add('active-chat')
        document.querySelector('.person[data-chat=person-1]').classList.add('active')

        let friends = {
          list: document.querySelector('ul.groupUsers'),
          all: document.querySelectorAll('.left .person'),
          name: ''
        },
          chat = {
            container: document.querySelector('.containerChat .right'),
            current: null,
            person: null,
            name: document.querySelector('.containerChat .right .top .name')
          }

        friends.all.forEach(f => {
          f.addEventListener('mousedown', () => {
            if (f.classList.contains('active')) {
              friends.list.querySelector('.active').classList.remove('active')
              f.classList.add('active')
              chat.current = chat.container.querySelector('.active-chat')
              chat.person = f.getAttribute('data-chat')
              chat.current.classList.remove('active-chat')
              chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat')
              friends.name = f.querySelector('.name').innerText
              chat.name.innerHTML = chat.name
            }
          })
        }); */
      })
    }
  }
}
</script>

<style scoped lang="scss">
@mixin font-bold {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
}

@mixin font {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --white: #fff;
  --black: #000;
  --bg: #f8f8f8;
  --grey: #999;
  --dark: #1a1a1a;
  --light: #e6e6e6;
  --wrapper: 1000px;
  --blue: #00b0ff;
}

.inputMessage {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: inherit;
  width: 100%;
  height: auto;
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  color: var(--color-black);
  background: var(--color-light);
  text-transform: unset;
  text-rendering: optimizeLegibility;
}

.input-container {
  display: flex;
}

.input-field {
  flex-grow: 1;
  padding: 8px;
}

.input-button {
  padding: 8px 16px;
}

.containerChat {
  .left {
    // margin-right: 0.2rem;

    input {
      float: left;
      width: 188px;
      height: 42px;
      padding: 0 15px;
      border: 1px solid var(--light);
      background-color: #eceff1;
      border-radius: 21px;
      @include font();

      &:focus {
        outline: none;
      }
    }

    .groupUsers {
      .person {
        cursor: pointer;

        &:after {
          content: '';
          transform: translate(-50%, 0);
        }

        img {
          float: left;
          width: 40px;
          height: 40px;
          margin-right: 12px;
          border-radius: 50%;
          object-fit: cover;
        }

        .name {
          font-size: 14px;
          line-height: 22px;
          color: var(--dark);
          @include font-bold;
        }

        &.active,
        &:hover {
          margin-top: -1px;
          margin-left: -1px;
          padding-top: 13px;
          border: 0;
          background-color: var(--blue);
          width: calc(100% + 2px);
          padding-left: calc(10% + 1px);

          span {
            color: var(--white);
            background: transparent;
          }

          &:after {
            display: none;
          }
        }
      }
    }
  }

  .right {
    // margin-left: -0.65rem;

    .chat {
      position: relative;
      display: none;
      overflow: hidden;
      padding: 0 35px 92px;
      border-width: 1px 1px 1px 0;
      border-style: solid;
      border-color: var(--light);
      height: calc(100% - 48px);
      justify-content: flex-end;
      flex-direction: column;

      &.active-chat {
        display: contents;

        .bubble {
          transition-timing-function: cubic-bezier(.4, -.04, 1, 1);

          @for $i from 1 through 10 {
            &:nth-of-type(#{$i}) {
              animation-duration: .15s * $i;
            }
          }
        }
      }
    }

    .bubble {
      font-size: 16px;
      position: relative;
      display: inline-block;
      clear: both;
      margin-right: 25px;
      margin-left: 25px;
      margin-bottom: 8px;
      padding: 13px 14px;
      vertical-align: top;
      border-radius: 5px;

      &:before {
        position: absolute;
        top: 19px;
        display: block;
        width: 8px;
        height: 6px;
        content: '\00a0';
        transform: rotate(29deg) skew(-35deg);
      }

      &.you {
        float: left;
        color: var(--white);
        background-color: rgb(147 197 253);
        align-self: flex-start;
        animation-name: slideFromLeft;

        &:before {
          left: -3px;
          background-color: rgb(147 197 253);
        }
      }

      &.me {
        float: right;
        color: var(--dark);
        background-color: rgb(224 242 254);
        align-self: flex-end;
        animation-name: slideFromRight;

        &:before {
          right: -3px;
          background-color: rgb(224 242 254);
        }
      }
    }

    .conversation-start {
      position: relative;
      width: 100%;
      margin-bottom: 27px;
      text-align: center;

      span {
        font-size: 14px;
        display: inline-block;

        &:before,
        &:after {
          position: absolute;
          top: 10px;
          display: inline-block;
          width: 30%;
          height: 1px;
          content: '';
          background-color: var(--light);
        }

        &:before {
          left: 0;
        }

        &:after {
          right: 0;
        }
      }
    }
  }
}

@keyframes slideFromLeft {
  0% {
    margin-left: -200px;
    opacity: 0;
  }

  100% {
    margin-left: 0;
    opacity: 1;
  }
}

@-webkit-keyframes slideFromLeft {
  0% {
    margin-left: -200px;
    opacity: 0;
  }

  100% {
    margin-left: 0;
    opacity: 1;
  }
}

@keyframes slideFromRight {
  0% {
    margin-right: -200px;
    opacity: 0;
  }

  100% {
    margin-right: 0;
    opacity: 1;
  }
}

@-webkit-keyframes slideFromRight {
  0% {
    margin-right: -200px;
    opacity: 0;
  }

  100% {
    margin-right: 0;
    opacity: 1;
  }
}
</style>
