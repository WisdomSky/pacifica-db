<template>
    <div class="page-container" :class="{wide}">
        <div class="page-content">
            <slot></slot>
        </div>
        <page-footer></page-footer>
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
    .page-container {
        width: 100%;
        max-width: 800px;
        margin: 25px auto 0 auto;
        padding-left: 16px;
        padding-right: 16px;

        .page-content {
            min-height: calc(100vh - 127px);
        }

        &.wide {
            max-width: 1200px;
        }

    }
</style>