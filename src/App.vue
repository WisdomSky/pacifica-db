<template>
  <div>
    <div class="navbar-container">
      <b-navbar class="navbar" toggleable="lg" type="dark" variant="default">
        <router-link class="navbar-brand" to="/">
          <img src="./assets/logo-nav.png"> Pacifica Database
        </router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <router-link to="/" v-slot="{ href, navigate }">
              <b-nav-item :href="href" @click="navigate">Guides</b-nav-item>
            </router-link>


            <b-nav-item-dropdown text="Database" right>

              <router-link to="/items" v-slot="{ href, navigate }">
                <b-dropdown-item :href="href" @click="navigate">Items</b-dropdown-item>
              </router-link>


              <b-dropdown-item href="#">Skills</b-dropdown-item>
              <b-dropdown-item href="#">Quests</b-dropdown-item>
              <b-dropdown-item href="#">Monsters</b-dropdown-item>
            </b-nav-item-dropdown>

            <router-link to="/" v-slot="{ href, navigate }">
              <b-nav-item :href="href" @click="navigate">Gallery</b-nav-item>
            </router-link>
            <router-link to="/" v-slot="{ href, navigate }">
              <b-nav-item :href="href" @click="navigate">About</b-nav-item>
            </router-link>




          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  .navbar-container {
    background-color: rgba(47, 199, 226, 1);
    text-align: center;
    height: 56px;
    .navbar {
      width: 100%;
      max-width: 800px;
      display: inline-flex;


      & /deep/ .navbar-brand {
        margin-top: -8px;
        margin-bottom: -8px;
        
        img {
          height: 45px;
        }
        
      }

      & /deep/ .nav-item a:not(.dropdown-item) {
        color: #fff;
      }




    }

    & /deep/ #nav-collapse {
      background-color: rgba(47, 199, 226, 1);
      margin-left: -16px;
      margin-right: -16px;
    }

  }
</style>
