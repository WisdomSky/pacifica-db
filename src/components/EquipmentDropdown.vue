<template>
    <dropdown class="d-inline-block ml-2" class-name="dropdown">
        <template slot="btn" class="lol"><a href="#" @click.prevent>Equipment</a></template>
        <template slot="body">
            <ul>
                <li>
                    <dropdown trigger="hover" role="sublist" align="right">
                        <template slot="btn">
                            <a href="#" @click.stop.prevent="$emit('select',{type: 'weapon', clear: true})">Weapon</a>
                        </template>
                        <template slot="body">
                            <ul>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'weapon', class: 'swordsman', clear: true})">Swordsman</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'weapon', class: 'waif', clear: true})">Waif</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'weapon', class: 'archer', clear: true})">Archer</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'weapon', class: 'deacon', clear: true})">Deacon</a></li>
                            </ul>
                        </template>
                    </dropdown>
                </li>
                <li>
                    <dropdown trigger="hover" role="sublist" align="right">
                        <template slot="btn">
                            <a href="#" @click.prevent.stop="$emit('select',{type: 'armor', clear: true})">Armor</a>
                        </template>
                        <template slot="body">
                            <ul>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'armor', class: 'swordsman', clear: true})">Swordsman</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'armor', class: 'waif', clear: true})">Waif</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'armor', class: 'archer', clear: true})">Archer</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'armor', class: 'deacon', clear: true})">Deacon</a></li>
                            </ul>
                        </template>
                    </dropdown>
                </li>
                <li>
                    <dropdown trigger="hover" role="sublist" align="right">
                        <template slot="btn">
                            <a href="#" @click.prevent.stop="$emit('select',{type: 'headgear', clear: true})">Headgear</a>
                        </template>
                        <template slot="body">
                            <ul>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'headgear', class: 'swordsman', clear: true})">Swordsman</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'headgear', class: 'waif', clear: true})">Waif</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'headgear', class: 'archer', clear: true})">Archer</a></li>
                                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'headgear', class: 'deacon', clear: true})">Deacon</a></li>
                            </ul>
                        </template>
                    </dropdown>
                </li>
                <li><a href="#" @click.prevent.stop="$emit('select',{type: 'pants', clear: true})">Pants</a></li>
                <li><a href="#" @click.prevent.stop="$emit('select',{type: 'gloves', clear: true})">Gloves</a></li>
                <li><a href="#" @click.prevent.stop="$emit('select',{type: 'footwear', clear: true})">Footwear</a></li>
                <li><a href="#" @click.prevent.stop="$emit('select',{type: 'necklace', clear: true})">Accessory</a></li>
                <li><a href="#" @click.prevent.stop="$emit('select',{type: 'daemon', clear: true})">Daemon (Pet)</a></li>
            </ul>
        </template>
    </dropdown>
</template>

<script>
    export default {
        name: "EquipmentDropdown"
    }
</script>

<style scoped>

    ul {
        list-style: none;
        padding: 0;
    }

    .dropdown {
        border: 0;
    }

</style>