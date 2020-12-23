<template>
    <a :href="`mailto:i.wisdomsky@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`"><slot>i.wisdomsky@gmail.com</slot></a>
</template>

<script>
    export default {
        props: {
            subject: {
                type: String,
                default: ''
            },
            body: {
                type: String,
                default: ''
            }
        },
        computed: {
            subjectEncoded() {
                return encodeURIComponent(this.subject);
            },
            bodyEncoded() {
                return encodeURIComponent(this.body);
            }
        }
    }
</script>

<style scoped>

</style>