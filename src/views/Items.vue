<template>
    <page-container>
        <h3 class="mb-4">Items Database</h3>
        <div v-masonry transition-duration="0" item-selector=".item" class="masonry-container">
            <div v-masonry-tile class="item" :key="item" v-for="(item, index) in items" :class="{'has-value': itemsValues[item] !== undefined}">
                <img :id="`item-${item}`" :src="getItemImg(item)">
                <b-tooltip :show.sync="showItems[item]" :target="`item-${item}`" :no-fade="true" placement="right" delay="0">
                    <div class="p-2">
                        <div>
                            <img :src="getItemImg(item)" width="70">
                        </div>
                        <h5>What is the name of this item?</h5>
                        <input type="text" @keyup.enter.prevent="saveItemName(item, $event)" list="itemdesc" autocomplete="off">
                    </div>
                </b-tooltip>
            </div>
        </div>

        <datalist id="itemdesc">
            <option v-for="item in itemdesc">{{ item.name }}</option>
        </datalist>
    </page-container>
</template>

<script>

    import items from '../assets/items.files'
    import itemdesc from '../assets/items'

    export default {
        data() {
            return {
                page: 1,
                perpage: 1000,
                user: "",
                items,
                itemdesc,
                itemscount: items.length,
                db: fbapp.database(),
                showItems: items.reduce((obj, val) => {
                    obj[val] = false;
                    return obj;
                }, {}),
                itemsValues: {}
            }
        },
        mounted() {
            this.user = prompt("Please enter your name");

            this.db.ref('/items').once('value').then((snapshot) => {
                this.$set(this.$data, 'itemsValues', snapshot.val())
            });


        },
        methods: {
            getItemImg(pet) {
                let images = require.context('../assets/items', false, /\.png$/);
                return images('./' + pet + ".png")
            },
            saveItemName(item, event) {

                this.db.ref('items/' + item).push({
                   name: event.target.value,
                   user: this.user
               });


                alert('Thank you for your contribution! :)')
                this.showItems[item] = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item {
        margin: 8px;
        box-sizing: border-box;
        opacity: 0.2;


        &.has-value {
            /*border: 3px #f22 solid;*/
            opacity: 1;
        }

        img {
            height: 40px;
            width: 40px;
        }

        &:hover {
            transform: scale(2);
            border: 1px solid #ccc;
         }

    }
</style>