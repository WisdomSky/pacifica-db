<template>
    <page-container>
        <h3 class="mb-4">Items Database </h3>

        <div class="mb-2">
            <b-input placeholder="Search for an item... e.g Crab Helm" v-model="query"></b-input>
        </div>

        <b-table
                :fields="fields"
                :items="filtered"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
        >
            <template v-slot:cell(name)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->

                <div class="d-inline-block item-container" :id="`item-${data.item.hash}`">
                    <div class="item">
                        <img :id="`item-${data.item.hash}`" :src="getItemImg(data.item)">
                    </div>
                    <a :href="`#${data.value.replace(/[^a-z]+/i,'-').toLowerCase()}`">{{ data.value }}</a>
                </div>
                <item-tooltip
                        :target="`item-${data.item.hash}`"
                        :name="data.item.name"
                ></item-tooltip>
            </template>
        </b-table>
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="Math.ceil(filtered.length / perPage)"
                          use-router></b-pagination-nav>


    </page-container>
</template>

<script>

    export default {
        data() {
            return {
                perPage    : 25,
                sortBy     : "",
                sortDesc   : false,
                query      : "",
                categorized: true,
                db         : fbapp.database(),
                dorks      : [
                    {
                        key: 'name'
                    },
                    {
                        key: 'type',
                    },
                    {
                        key: 'class'
                    },
                ],
                fields     : [

                    {
                        key     : 'name',
                        label   : 'Name',
                        sortable: true
                    },
                    {
                        key     : 'lvlreq',
                        label   : 'Level',
                        sortable: true
                    },
                    {
                        key     : 'type',
                        sortable: true
                    },
                    {
                        // A regular column with custom formatter
                        key      : 'classreq',
                        sortable : true,
                        label    : 'Class',
                        formatter: value => {
                            return value || 'All'
                        }
                    },
                ],
            }
        },
        watch   : {
            query() {
                try {
                    this.$router.replace({
                         query: {
                             page: undefined
                         }
                     })
                } catch (e) {

                }
            }
        },
        computed: {
            currentPage() {
                return this.$route.query.page || 1;
            },
            items() {
                return this.$store.state.items
            },
            filtered() {

                let query = this.query;

                let dorks = this.dorks.map(dork => dork.key);


                if (query.indexOf(":") !== -1) {
                    let regex = new RegExp(`((?:${dorks.join('|')}):(?:(?!${dorks.join('|')}).)+)`, "g");

                    let match;

                    if (match = this.query.match(regex)) {
                        query = match.reduce((obj, val) => {
                            let [k, v] = val.split(":", 2);
                            obj[k] = v;
                            return obj
                        }, {});

                    }

                }


                console.log(query)

                return this.items.filter(item => {
                    return JSON.stringify(item).toLowerCase().indexOf(query.toLowerCase()) !== -1;
                })
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
                                this.$store.commit('mapItem', {
                                    name    : sent_entries[sent_entries.length - 1].name,
                                    id,
                                    approval: true
                                });
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
            getItemImg(item) {

                let images = require.context('../assets/items', false, /\.png$/);

                if (item.type === 'Daemon') {
                    return require('../assets/items/161.png')
                } else if (item.id && images.keys().indexOf(`./${item.id}.png`) !== -1) {
                    return images('./' + item.id + ".png")
                } else {
                    return require('../assets/noimg.png')
                }
            },
            linkGen(pageNum) {
                return pageNum === 1 ? '?' : `?page=${pageNum}`
            }
        }
    }
</script>

<style lang="scss" scoped>


    .item-container {

        .item {
            background-color: #222;
            border-radius: 5px;
            border: 2px solid #777;
            display: inline-block;
            padding: 2px;
            margin-right: 10px;
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
                height: 30px;
                width: 30px;
            }

        }

        &:hover {

            .item {

                background-color: #ff2;
                box-shadow: 0 0 20px 20px #ff2;
                border-color: transparent;

                img {
                    transform: scale(1.5);
                }

            }

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