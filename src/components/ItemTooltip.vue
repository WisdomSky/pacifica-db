<template>
    <b-tooltip :show.sync="show" :target="target" :no-fade="true" placement="right" delay="0" triggers="hover" @show="$emit('show', $event)">
        <div>
            <b-container class="item-info">
                <b-row no-gutters>
                    <b-col :cols="12" class="item-name"> {{ item.name }} </b-col>
                </b-row>
                <b-row no-gutters>
                    <b-col :cols="3" class="item-img"><img :src="itemImg" width="70"></b-col>
                    <b-col class="item-stat">
                        <div>Type: {{ item.type }}</div>
                        <div>
                            <div class="d-inline-block" style="min-width: 50px">Price: P{{ item.price }}
                            </div>
                            <div class="d-inline-block" style="margin-left: 10px">Weight: {{ isGem ? '5' : item.weight }}
                            </div>
                        </div>
                        <div>Sell Price: P{{ Math.floor(item.price / 2) }}</div>
                        <div>Req'd Class: {{ item.classreq || 'General' }}</div>
                        <div>Required Level: {{ item.lvlreq || '0' }}</div>
                        <div v-if="isGem">Chakra: {{ item.weight }}</div>
                    </b-col>
                </b-row>
                <b-row no-gutters>
                    <b-col :cols="12" class="item-desc">
                        <div>
                            <p  class="m-0 p-0" v-html="descOrCol2 && descOrCol2.replace(/\\n/gi, '<br>') || '<em>No description.</em>'"></p>
                            <template v-if="item.stats && typeof item.stats === 'string'">
                                <p class="ml-1 mt-2 mb-1 text-danger">
                                    <strong>Effects:</strong>
                                </p>
                                <p class="ml-2 text-danger" v-html="formatStats(item.stats)"></p>
                            </template>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </b-tooltip>
</template>

<script>

    import Case from 'case'


    export default {
        props: {
            target: String,
            item: Object,

        },
        data() {
          return {
              show: false
          }
        },
        computed: {
            isGem() {
                return this.item.type.endsWith('Gem');
            },
            descOrCol2() {

                if (this.item.desc && typeof this.item.desc === 'string') return this.item.desc;
                else if (this.item.unknownCol2 && typeof this.item.unknownCol2 === 'string') return this.item.unknownCol2;
                else return undefined;


            },
            itemImg() {

                let images = require.context('../assets/items', false, /\.png$/);

                if (this.item.type === 'Daemon') {
                    return require('../assets/items/161.png')
                } else if (this.item.id && images.keys().indexOf(`./${this.item.id}.png`) !== -1) {
                    return images('./' + this.item.id + ".png")
                } else {
                    return require('../assets/noimg.png')
                }
            },
        },
        methods: {
            formatStats(stats) {
                return stats.split(' ').map((stat) => {

                    let [label, value] = stat.split('=');

                    let keywords = [
                        'slash_chance',
                        'duplicate_chance',
                        'chance',
                        'plus',
                        'effect_percent',
                        'percent',
                        'duration',
                        'heal_life',
                        'regen_life',
                        'daemon_damage',
                        'regen_weight',
                        'damage',
                        'fortune',
                        'cookie',
                        'sweetcane',
                        'cane',
                        'boost',
                        'range'
                    ];


                    if (String(value).trim().charAt(0) !== '-') {
                        value = '+' + value;
                    }


                    let match;


                    if (match = label.match(/(.+)_slash_chance$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}% chance to trigger`;
                    }
                    if (match = label.match(/(.+)_duplicate_chance$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}% chance to double`;
                    }
                    if (match = label.match(/(.+)_chance$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}% chance`;
                    }
                    if (match = label.match(/(.+)_plus$/i)) {

                        if (match[1] === 'flee') match[1] = 'dodge';

                        if (match[1] === 'defense') {
                            value = (value * 0.39) + '%';
                        }

                        return `<strong>${Case.capital(match[1])}</strong>: ${value}`;
                    }


                    if (match = label.match(/(.+)_non_undead_damage_percent$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}% damage to non-undead`;
                    }

                    if (match = label.match(/(.+)_effect_percent$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}% effect`;
                    }

                    if (match = label.match(/(.+)_offense_percent$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}% offense`;
                    }

                    if (match = label.match(/(.+)_duration_percent$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}% duration`;
                    }

                    if (match = label.match(/(.+)_effect_duration$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value} seconds effect duration`;
                    }
                    if (match = label.match(/(.+)_duration$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value} seconds duration`;
                    }

                    if (match = label.match(/(.+)_percent$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value}%`;
                    }

                    if (match = label.match(/(.+)_range$/i)) {
                        return `<strong>${Case.capital(match[1])}</strong>: ${value} range`;
                    }

                    if (label === 'heal_life') {
                        return `<strong>HP Restore</strong>: ${value}`;
                    }
                    if (label === 'regen_life') {
                        return `<strong>HP Regen</strong>: ${value}`;
                    }

                    if (label === 'daemon_damage') {
                        return undefined;
                    }
                    if (label === 'damage') {
                        return undefined;
                    }

                    return `<strong>${Case.capital(label)}</strong>` + (value !== 0 ? ': ' + value : '')


                }).filter(v => v !== undefined).sort((a,b) => {

                    let reg = /^<strong>(Strength|Fortitude|Wisdom|Luck|Dexterity|Dodge|Speed|Vitality)<\/strong>:.*/i;

                    if (a.match(reg) && b.match(reg)) {
                        if (a > b) return 1;
                        else if (b > a) return -1;
                        else 0;
                    } else if (a.match(reg)) {
                        return -1;
                    } else if (b.match(reg)) {
                        return 1;
                    }

                    return 0;
                }).join('<br>')
            }

        }
    }
</script>

<style lang="scss" scoped>
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