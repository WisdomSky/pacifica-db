<template>
    <page-container>
        <h3 class="mb-4">Items Database </h3>

        <div class="mb-2">
            <b-input placeholder="Search for an item... e.g Crab Helm" v-model="query"></b-input>
        </div>
        <div class="mb-3">
            <a href="#" @click.prevent="query = ''" class="float-right text-danger font-weight-bold" v-if="query.trim().length">
                <small>Clear filter</small>
            </a>
            Filter:
            <featured-dropdown @select="filter($event)"/>
            <equipment-dropdown @select="filter($event)"/>
            <gem-dropdown @select="filter($event)" class="ml-2"/>
            <consumable-dropdown @select="filter($event)" class="ml-2"/>
            <appraisal-dropdown @select="filter($event)" class="ml-2"/>
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
                        :item="data.item"
                ></item-tooltip>
            </template>
        </b-table>
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="noOfPages" v-if="noOfPages > 1" use-router></b-pagination-nav>


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
                this.$router.replace({
                     query: {
                         page: undefined
                     }
                 }).catch(() => {

                })
            }
        },
        computed: {
            noOfPages() {
              return Math.ceil(this.filtered.length / this.perPage);
            },
            currentPage() {
                return this.$route.query.page || 1;
            },
            items() {
                return this.$store.state.items
            },
            filtered() {

                let dorks,dork_types = ['type', 'class', 'featured'];

                let pattern = new RegExp(`\\[((?:${dork_types.join('|')}):[^\\]]+)\\]`, 'g');


                if (dorks = this.query.match(pattern)) {
                    dorks = dorks.reduce((obj, dork) => {
                        let [k,v] = dork.replace(/[\[\]]/g, '').trim().split(':', 2);
                        obj[k] = v;
                        return obj;
                    }, {});
                }

                let query = this.query.replace(pattern, '').trim().replace(/\s+/g, ' ').split(' ');


                return this.items.filter(item => {
                    let tokens = JSON.stringify(item).toLowerCase();

                    for (let key in dorks) {
                        if (dorks.hasOwnProperty(key)) {

                            let itemKey = key;
                            switch (key) {
                                case 'class':
                                    itemKey = 'classreq';
                                    break;
                            }

                            let itema = item[itemKey], itemb = dorks[key];

                            if (typeof itema === 'string') {
                                itema = itema.toLowerCase();
                            }
                            if (typeof itemb === 'string') {
                                itemb = itemb.toLowerCase();
                            }

                            if (itemb === "true" || itemb === "false") {
                                itemb = itemb === "true";
                            }


                            if (itema !== itemb) return false;
                        }
                    }

                    for (let i=0;i<query.length;i++) {
                        if (tokens.indexOf(query[i].toLowerCase().trim()) !== -1) return true;
                    }

                    return false;
                })
            }
        },
        mounted() {

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
            },
            filter(obj) {

                if (obj.clear) {
                    this.query = '';
                    delete obj.clear
                }

                for (let type in obj) {
                    if (obj.hasOwnProperty(type)) {
                        let value = obj[type];

                        let s = `[${type}:${value}]`;

                        if (this.query.indexOf(s) === -1) {
                            this.query += `${s} `
                        }
                    }
                }



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