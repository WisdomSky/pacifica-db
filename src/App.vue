<template>
    <div id="app"  :class="`page-${$route.name && $route.name.toLowerCase()}`">
        <div class="navbar-container">
            <b-navbar class="navbar" toggleable="lg" type="dark" variant="default">
                <router-link class="navbar-brand" to="/">
                    <img src="./assets/logo-nav.png"> <span>Hello PO</span>
                </router-link>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">


                        <!--<router-link to="/guides" v-slot="{ href, navigate }">-->
                            <!--<b-nav-item :href="href" @click="navigate">Guides</b-nav-item>-->
                        <!--</router-link>-->

                        <router-link to="/items" v-slot="{ href, navigate }">
                            <b-nav-item :href="href" @click="navigate">Database</b-nav-item>
                        </router-link>

                        <!--<b-nav-item-dropdown text="Database" right>-->

                            <!--<router-link to="/items" v-slot="{ href, navigate }">-->
                                <!--<b-dropdown-item :href="href" @click="navigate">Items</b-dropdown-item>-->
                            <!--</router-link>-->

                            <!--<router-link to="/classes" v-slot="{ href, navigate }">-->
                                <!--<b-dropdown-item :href="href" @click="navigate">Classes</b-dropdown-item>-->
                            <!--</router-link>-->

                            <!--<router-link to="/quests" v-slot="{ href, navigate }">-->
                                <!--<b-dropdown-item :href="href" @click="navigate">Quests</b-dropdown-item>-->
                            <!--</router-link>-->
                            <!--<router-link to="/monsters" v-slot="{ href, navigate }">-->
                                <!--<b-dropdown-item :href="href" @click="navigate">Monsters</b-dropdown-item>-->
                            <!--</router-link>-->

                        <!--</b-nav-item-dropdown>-->

                        <router-link to="/gallery" v-slot="{ href, navigate }">
                            <b-nav-item :href="href" @click="navigate">Gallery</b-nav-item>
                        </router-link>


                        <router-link to="/music" v-slot="{ href, navigate }">
                            <b-nav-item :href="href" @click="navigate">Music</b-nav-item>
                        </router-link>

                        <!--<router-link to="/live" v-slot="{ href, navigate }" class="live">-->
                            <!--<b-nav-item :href="href" @click="navigate">Live Steamers&lt;!&ndash;<div id="live-marker"></div>&ndash;&gt;</b-nav-item>-->
                        <!--</router-link>-->


                        <router-link to="/about" v-slot="{ href, navigate }">
                            <b-nav-item :href="href" @click="navigate">About</b-nav-item>
                        </router-link>



                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <router-view/>
    </div>
</template>

<script>

    import items from './assets/items.mapped2'

    export default {

        mounted() {

            this.$store.commit('setItems', items);

        }

    }

</script>

<style lang="scss" scoped>

    #app {
        min-height: 100%;
    }

    .navbar-container {
        background-color: rgba(47, 199, 226, 1);
        text-align: center;
        height: 56px;
        .navbar {
            width: 100%;
            max-width: 800px;
            display: inline-flex;

            & ::v-deep .navbar-brand {
                margin-top: -8px;
                margin-bottom: -8px;

                img {
                    height: 40px;
                }

                span {
                    vertical-align: sub;
                }

            }

            & ::v-deep .nav-item a:not(.dropdown-item) {
                color: #fff;
            }

        }

        .live {
            /*border: 3px solid #f33;*/
            /*border-radius: 15px;*/

            /*a {*/
                /*padding: 5px 10px;*/
            /*}*/

            /*margin-right: 10px;*/
        }

        #live-marker {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 12px;
            background: #f00;
            margin-left: 5px;
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

    }
</style>
