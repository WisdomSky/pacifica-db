<template>
  <page-container wide>
    <h3 class="mb-4">
      <div class="float-right">
        <small>Sort By:</small>&nbsp;&nbsp;&nbsp;
        <b-dropdown id="sort" :text="sortAsc ? 'Alphabetical Order' : 'Live Now First'" variant="danger">
          <b-dropdown-item @click="sortAsc = false">Live Now First</b-dropdown-item>
          <b-dropdown-item @click="sortAsc = true">Alphabetical Order</b-dropdown-item>
        </b-dropdown>
      </div>
      Pacifica Live Streamers
    </h3>

    <div class="mt-4 pt-4">
      <b-container>
        <b-row>
          <b-col class="live-item-container"
                 v-for="(live, index) in toArray"
                 :key="live.name"
                 :class="{live: live.live}"
                 :data-index="index"
                 cols="6"
                 lg="3"
                 md="4"
          >
            <a :href="`${live.url}`" target="_blank">
              <img :src="live.picture" :alt="live.name">
              <div class="name">
                <strong>{{ live.name}}</strong>
              </div>
            </a>
          </b-col>
        </b-row>
      </b-container>



    </div>

  </page-container>
</template>


<script>

  import axios from 'axios'

  export default {

      data() {
          return {
              db         : fbapp.database(),
              scanner: null,
              sortAsc: false
          }
      },

      created() {
          this.scanLive();

          if (this.scanner !== null) clearInterval(this.scanner);

          this.scanner = setInterval(() => {
              this.scanLive();
          }, 60000);

      },
      computed: {
          toArray() {
              return this.$store.getters.live.sort((a, b) => {

                  if (!this.sortAsc) {
                      if (a.live && !b.live) return -1;
                      if (!a.live && b.live) return 1;
                  }

                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;

                  return 0;
              })
          }
      },
      beforeDestroy() {
        clearInterval(this.scanner) ;
      },

      methods: {
          scanLive() {
              this.db.ref('/live').once('value').then((snapshot) => {
                  let pages = snapshot.val();
                  for (let page_name in pages) {
                      if (pages.hasOwnProperty(page_name)) {
                          let page_url = pages[page_name];

                          this.checkLive(page_url).then(async (live) => {
                              this.$store.commit('updateLive', {
                                  name: page_name,
                                  url: page_url,
                                  live
                              });

                              let page_username = page_url.replace(/^https:\/\/www\.facebook\.com\/(.*)$/, '$1');

                              axios.get(`http://3.22.178.32:8888/https://graph.facebook.com/v9.0/${page_username}/picture?redirect=0&type=large`).then(({data: { data }}) => {
                                  this.$store.commit('updateLive', {
                                      name: page_name,
                                      picture: data.url
                                  });
                              })

                              await this.$nextTick();

                          })

                      }
                  }


              })
          },
          checkLive(url) {
            return axios.get(`http://3.22.178.32:8888/${url}/live_videos`).then(({ data }) => {
                return data.indexOf('Happening Now') !== -1;
            })
          }
      }



  }

</script>


<style lang="scss" scoped>
  .live-item-container {
    width: 20%;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;

    &:not(.live) {
      opacity: 0.50;

      &:hover {
        opacity: 1;
      }

    }


    @media all and (max-width: 1079px) {
      width: 25%;
    }
    @media all and (max-width: 768px) {
      width: 33%;
    }

    @media all and (max-width: 540px) {
      width: 50%;
    }


    a {
      color: #777;

      img {
        width: 100%;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        transition: transform 0.25s ease-out;



      }

      .name {
        margin-top: 10px;
        white-space: nowrap;
        text-align: center;
      }


      &:hover {
        img {
          box-shadow: 0 0 0 10px #2fc7e2;
          transform: scale(1.05);


        }
      }

    }


    &.live img {
      box-shadow: 0 0 0 10px #f00;
      animation: border-blink 2s infinite;


      a:hover {
        img {
          &.live {
            animation: border-blink-hover 2s infinite;
          }
        }
      }


    }


  }

  .is-live {
    height: 12px;
    width: 12px;
    background: #f00;
    border-radius: 12px;
    display: inline-block;
    animation: blink 1s infinite;
  }

  @keyframes border-blink {
    0% {
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 1);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 1);
    }
  }

  @keyframes border-blink-hover {
    0% {
      box-shadow: 0 0 0 10px rgba(47, 199, 226, 1);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(47, 199, 226, 0);
    }
    100% {
      box-shadow: 0 0 0 10px rgba(47, 199, 226, 1);
    }
  }


</style>