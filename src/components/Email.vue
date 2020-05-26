<template>
    <a :href="`mailto:admin@hellopo.org?subject=${subjectEncoded}&body=${bodyEncoded}`"><slot>admin@hellopo.org</slot></a>
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