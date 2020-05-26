<template>
    <div class="page-section" :class="{wide}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            wide: Boolean
        }
    }
</script>

<style lang="scss" scoped>
    .page-section {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;

        &.wide {
            max-width: 1200px;
        }

    }
</style>