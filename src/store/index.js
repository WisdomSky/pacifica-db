import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import hash from 'hash-sum'
import VuexPersist from 'vuex-persist'


const vuexPersist = new VuexPersist({
            key: 'hellopo',
            storage: window.localStorage,
            reducer: (state) => {
                return {
                    live: state.live
                }
            },
        });


Vue.use(Vuex);

export default new Vuex.Store({
      state    : {
          items: [],
          live: {}
      },
      getters: {
        live(state) {

            let arr = [];

            for (let page_name in state.live) {
                if (state.live.hasOwnProperty(page_name)) {
                    let page = JSON.parse(JSON.stringify(state.live[page_name]));
                    page.name = page_name;
                    arr.push(page)
                }
            }

            return arr;
        }
      },
      mutations: {
          setLive(state, list) {
              state.live = list;
          },
          updateLive(state, payload) {
              let live = state.live[payload.name];
              if (live !== undefined) {
                  if (payload.live !== undefined) live.live = payload.live;
                  if (payload.picture !== undefined) live.picture = payload.picture;
                  Vue.set(state.live, payload.name, live)
              } else {

                  if (payload.picture === undefined) payload.picture = null;
                  if (payload.live === undefined) payload.live = false;

                  Vue.set(state.live, payload.name, payload)
              }
          },
          setItems(state, items) {
              state.items = items
          },
          mapItem(state, payload) {

              let id = Number(payload.id);

              let item,index;

              index = _.findIndex(state.items, ['id', id]);

              if (index !== -1) {

                  item = JSON.parse(JSON.stringify(state.items[index]));

                  item.id = undefined;

                  if (payload.approval) {
                      item.approval = payload.approval;
                  }

                  item.hash = hash(item);
                  Vue.set(state.items, index, item);
              }


              index = _.findIndex(state.items, ['name', payload.name]);
              item = JSON.parse(JSON.stringify(state.items[index]));

              item.id = id;

              if (payload.approval) {
                  item.approval = payload.approval;
              }

              item.hash = hash(item)
              Vue.set(state.items, index, item);

          },
      },
      actions  : {},
      modules  : {},
      plugins: [vuexPersist.plugin]
  })
