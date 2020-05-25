import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import hash from 'hash-sum'

Vue.use(Vuex)

export default new Vuex.Store({
      state    : {
          items: [],

      },
      mutations: {
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
      modules  : {}
  })
