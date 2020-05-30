<template>
    <dropdown class="d-inline-block" class-name="dropdown" :is-icon="false">
        <template slot="btn"><a href="#" @click.prevent="$emit('select',{featured: true, clear: true})">Featured</a></template>
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