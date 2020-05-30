<template>
    <dropdown class="d-inline-block" class-name="dropdown">
        <template slot="btn"><a href="#" @click.prevent>Gem</a></template>
        <template slot="body">
            <ul>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'weapon gem', clear: true})">Weapon Gem</a></li>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'armor gem', clear: true})">Armor Gem</a></li>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'headgear gem', clear: true})">Headgear Gem</a></li>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'pants gem', clear: true})">Pants Gem</a></li>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'gloves gem', clear: true})">Gloves Gem</a></li>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'footwear gem', clear: true})">Footwear Gem</a></li>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'necklace gem', clear: true})">Accessory Gem</a></li>
                <li><a href="#" @click.stop.prevent="$emit('select',{type: 'daemon gem', clear: true})">Daemon Gem</a></li>
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