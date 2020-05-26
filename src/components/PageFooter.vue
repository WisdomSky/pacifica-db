<template>
    <div class="page-footer mb-1">
        <hr class="m-2">
        <b-row>
            <b-col :cols="12" :md="6">
                All media and content on <a href="/">HelloPO.org</a> belong to their respective creators.
            </b-col>
            <b-col :cols="12" :md="6" class="text-md-right">
                <a href="#">Terms</a>
                | <a href="mailto:admin@hellopo.org?subject=">Submit a content</a>
                | <a href="mailto:admin@hellopo.org">Contact Us</a>
                <a href="https://www.facebook.com/groups/thedeaconsleague/" class="ml-2" target="_blank"><img src="../assets/fb.png" height="18"></a>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .page-footer {
        min-height: 30px;
        font-size: 10px;
    }
</style>