<template>
    <page-container>
        <div class="banner mb-4">
            <img src="../assets/hello.png">
        </div>
        <div>
            <input type="text" id="search" placeholder="Crab helm" v-model="search" @keypress.enter.prevent="submit"
                   tabindex="1" ref="search">
        </div>
        <div id="submit-container">
            <button @click="submit"><img src="../assets/items/1.png" style="height: 25px;vertical-align: top"
                                         class="mr-2">Item Search
            </button>
            <button @click="fortuneCookie"><img src="../assets/items/200.png" style="height: 25px;vertical-align: top"
                                                class="mr-2">I ate a Fortune Cookie!
            </button>
        </div>
    </page-container>
</template>

<script>


    export default {
        data() {
            return {
                search: ''
            }
        },
        mounted() {
            this.focus();
        },
        methods: {
            submit() {

                this.focus();

                if (this.search.trim().length === 0) return false;

                this.$router.push({
                                      path : '/items',
                                      query: {
                                          s: this.search
                                      }
                                  })
            },
            fortuneCookie() {
                let rand_index = Math.floor(Math.random() * (this.$store.state.items.length + 1));

                this.search = this.$store.state.items[rand_index].name.toLowerCase();

                this.submit()

            },
            focus() {
                this.$refs.search.focus();
            }
        }
    }
</script>


<style lang="scss" scoped>
    .banner {
        padding-top: 10vh;
        height: 35vh;
        overflow: hidden;
        text-align: center;
        img {
            height: 100%;

            @media all and (max-width: 800px) {
                margin-top: 0;
            }

        }
    }

    #search {
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
        padding: 10px 20px;
        color: #777;
        width: 100%;
        box-shadow: 0 5px 10px 0 rgba(100, 100, 100, 0.25);
    }

    #submit-container {
        text-align: center;

        button {
            margin-top: 20px;
        }

    }

    button {
        border-radius: 5px;
        border: 1px solid transparent;
        padding: 5px 10px;
        background-color: #2fc7e2;
        color: #fff;
        margin: 0 10px;
        outline: none;

        &:hover {
            border: 1px solid #28acc3;
            box-shadow: 0 5px 5px 0 rgba(100, 100, 100, 0.25);
        }

        &:active {
            border: 1px solid #124c57;
        }

    }

</style>


<style lang="scss">
    #app.page-index {
        .navbar-container, #nav-collapse {
            background-color: transparent;
        }

        .navbar-container .navbar .nav-item a:not(.dropdown-item) {
            color: #ccc;
        }

        .navbar-brand {
            opacity: 0;
            pointer-events: none;
        }

        .navbar-toggler {
            border-color: #00000022;
        }
        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
        }

        @media all and (max-width: 992px) {
            #nav-collapse ul {
                margin-top: 10px;
                background-color: #2fc7e2;

                li a {
                    color: #fff;
                }

            }
        }

    }
</style>