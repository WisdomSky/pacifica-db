<template>
    <page-container>
        <h3 class="mb-4">Items Database </h3>
        <div class="mb-2">WARNING! Currently running in <u class="text-danger">(Edit Mode)</u>!</div>

        <b-button-group size="sm" class="mb-3">
            <b-button variant="info" :class="{active: categorized}" @click="categorized = true">Categorized</b-button>
            <b-button variant="danger" :class="{active: !categorized}"  @click="categorized = false">Not categorized</b-button>
        </b-button-group>

        <div v-masonry transition-duration="0" item-selector=".item" class="masonry-container">
            <div v-masonry-tile class="item" :key="item.hash" v-for="(item, index) in items" v-if="categorized" :class="{approval: item.approval}">
                <img :id="`item-${item.hash}`" :src="getItemImgByName(item.name)">
                <item-tooltip-edit :target="`item-${item.hash}`" :name="item.name" @submit="saveItemName"></item-tooltip-edit>
            </div>
            <div v-masonry-tile class="item" :key="id" v-for="id in items" v-if="!categorized">
                <img :id="`item-${id}`" :src="getItemImgById(id)">
                <item-tooltip-edit :target="`item-${id}`" :id="id" :edit-mode="true" @submit="saveItemName"></item-tooltip-edit>
            </div>

        </div>

        <div class="text-center mt-4">
            <b-pagination-nav class="d-inline-flex" variant="info" :link-gen="linkGen"
                              :number-of-pages="Math.ceil((categorized ? itemsfiltered.length : uncategorizedlist.length) / perpage)"
                              use-router></b-pagination-nav>
        </div>

    </page-container>
</template>

<script>

    import ids from '../assets/items.files'

    import moment from 'moment-timezone'
    import _ from 'lodash'

    export default {
        data() {
            return {
                perpage    : 100,
                user       : "",
                categorized: true,
                db         : fbapp.database(),
                contributors: {}
            }
        },
        watch: {
            categorized() {
                this.$router.push({
                    query: {
                        page: undefined
                    }
                 })
            }
        },
        computed: {
            itemslist() {
                return this.$store.state.items
            },
            itemsfiltered() {
                return this.itemslist.filter(item => item.id);
            },
            items() {
                let pointer = (this.currentpage - 1) * this.perpage;
                if (this.categorized) {
                    return this.itemsfiltered.slice(pointer, pointer + 100);
                } else {
                    return this.uncategorizedlist.slice(pointer, pointer + 100);
                }
            },
            currentpage() {
                return this.$route.query.page || 1;
            },
            uncategorizedlist() {
                let categorizedids = this.itemsfiltered.map(item => item.id);
                let uncategorizedids = _.difference(ids, categorizedids);

                let images = require.context('../assets/items', false, /\.png$/);

                return uncategorizedids.filter(id => images.keys().indexOf(`./${id}.png`) !== -1);
            }
        },
        mounted() {

            // this.user = prompt("Please enter your name");



            this.db.ref('/items').on('value', (snapshot) => {
                let entries = snapshot.val();
                for (let id in entries) {
                    if (entries.hasOwnProperty(id)) {
                        let name = entries[id];

                        switch (typeof name) {
                            case 'string':
                                this.$store.commit('mapItem', {name, id});
                                break;
                            case 'object':
                                let sent_entries = Object.values(name);

                                console.log(sent_entries)
                                sent_entries.forEach(item => {
                                    if (item.user) {
                                        this.contributors[item.user] = 1;
                                    }
                                });

                                this.$store.commit('mapItem', {name: sent_entries[sent_entries.length-1].name, id, approval: true});
                                break;
                        }

                    }
                }


            });


        },
        beforeDestroy() {
            this.db.ref('/items').off('value');
        },
        methods : {
            getItemImgByName(name) {

                let item = _.find(this.itemslist,  ['name', name]);
                let images = require.context('../assets/items', false, /\.png$/);

                if (item.type === 'ed') {
                    return require('../assets/items/161.png')
                } else if (item.id && images.keys().indexOf(`./${item.id}.png`) !== -1) {
                    return images('./' + item.id + ".png")
                } else {
                    return require('../assets/noimg.png')
                }
            },
            getItemImgById(id) {

                let images = require.context('../assets/items', false, /\.png$/);

                return images('./' + id + ".png")
            },
            saveItemName(event) {

                if (this.user === 'wisdomsky') {
                    this.db.ref('items/' + event.id).set(event.name);
                } else {

                    this.db.ref('items/' + event.id).push({
                                                          name: event.name,
                                                          user: this.user,
                                                          date: moment.utc().format('YYYY-MM-DD HH:mm:ss')
                                                      });
                    alert('Thank you for your contribution! :)')
                }
            },
            linkGen(pageNum) {
                return pageNum === 1 ? '?' : `?page=${pageNum}`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item {
        margin: 8px;
        box-sizing: border-box;

        &.approval {
            /*border: 3px #f22 solid;*/
            /*border: 1px solid #f00;*/
            box-shadow: 0 0 0px 2px #f22;
        }

        &.value-approved {
            border: 0;
            opacity: 1;
        }

        img {
            height: 40px;
            width: 40px;
        }

        &:hover {
            background-color: #ff2;
            box-shadow: 0 0 20px 20px #ff2;
            border-radius: 90%;

            img {
                transform: scale(2);
            }

        }

    }

    .item-info {
        margin: 0;
        padding: 0;
        min-width: 300px;

        .item-name {
            text-align: left;
            color: rgb(255, 255, 8);
            font-weight: bold;
            background-color: rgb(28, 28, 28);
            margin-bottom: 2px;
            padding-left: 5px;
        }

        .item-img {
            border: 3px solid rgb(28, 28, 28);
            border-radius: 5px;
            margin-left: 2px;
        }

        .item-stat {
            border: 3px solid rgb(28, 28, 28);
            border-radius: 5px;
            text-align: left;
            font-size: 11px;
            padding-left: 5px;
            margin-left: 2px;
            margin-right: 2px;
        }

        .item-desc div {
            border: 3px solid rgb(84, 64, 16);
            font-size: 11px;
            border-radius: 5px;
            margin-left: 4px;
            margin-right: 6px;
            margin-top: 2px;
            padding: 5px 3px;
            text-align: left;
        }

        & ::v-deep .row {

        }

    }


</style>

<style>
    .tooltip-inner {
        max-width: 300px !important;
        padding: 0 !important;
        border: 3px solid rgb(28, 28, 28);
        overflow-x: hidden !important;
    }
</style>