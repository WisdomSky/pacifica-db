<template>
    <div class="page-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "PageContainer"
    }
</script>

<style scoped>
    .page-container {
        width: 100%;
        max-width: 800px;
        margin: 25px auto;
        padding-left: 16px;
        padding-right: 16px;
    }
</style>