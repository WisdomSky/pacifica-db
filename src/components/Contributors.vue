<template>
    <div class="contributors pt-1">

        <template v-for="contrib in contributors">
            <a :href="contrib.url" v-b-tooltip.hover :title="contrib.name" target="_blank" v-if="contrib.url" :key="contrib.name">
                <img :src="contrib.img" :width="avatarSize">
            </a>
            <span v-else :key="contrib.name" v-b-tooltip.hover :title="contrib.name">
                <img src="../assets/avatars/contributor.png" :width="avatarSize">
            </span>
        </template>


    </div>
</template>

<script>
    export default {
        data() {

            let images = require.context('../assets/avatars', false, /\.(png|jpg)$/);

            return {
                avatarSize: 72,
                contributors: [
                    {
                        name: 'WisdomSky',
                        img: 'https://graph.facebook.com/v7.0/100000004811603/picture',
                        url: 'https://fb.me/WisdomSky'
                    },
                    {
                        name: 'Der Fuhrer',
                        img: 'https://graph.facebook.com/v7.0/100003211510343/picture',
                        url: 'https://fb.me/Logrizer'
                    },
                    {
                        name: 'Rabitei',
                        img: 'https://graph.facebook.com/v7.0/1479215352/picture',
                        url: 'https://fb.me/alyasninong'
                    },
                    {
                        name: 'Sakura',
                        img: 'https://graph.facebook.com/v7.0/100002533145270/picture',
                        url: 'https://fb.me/aishteru.sakura'
                    },
                    {
                        name: 'Steven',
                        img: 'https://graph.facebook.com/v7.0/100046983332105/picture',
                        url: 'https://www.facebook.com/profile.php?id=100046983332105'
                    },
                    {
                        name: 'AikO',
                        img: 'https://graph.facebook.com/v7.0/100000670593842/picture',
                        url: 'https://fb.me/Bbykia'
                    },
                    {
                        name: 'Martinpaulo Cuartero',
                        img: 'https://graph.facebook.com/v7.0/100000484792151/picture',
                        url: 'https://fb.me/martinpogi123'
                    },
                    {
                        name: 'Roy Ivan Viacrucis',
                        img: 'https://graph.facebook.com/v7.0/100014805522109/picture',
                        url: 'https://fb.me/royivan.martires.5'
                    },
                    {
                        name: 'Tee Jay',
                        img: 'https://graph.facebook.com/v7.0/100017714160850/picture',
                        url: 'https://fb.me/calvinthompson23'
                    },
                    {
                        name: 'Lay Cruz',
                        img: 'https://graph.facebook.com/v7.0/100003114096368/picture',
                        url: 'https://fb.me/alexisxcruz'
                    },
                    {
                        name: 'Edcel B Celso',
                        img: 'https://graph.facebook.com/v7.0/100001385239302/picture',
                        url: 'https://fb.me/qweqwek'
                    },
                    {
                        name: 'Yuri Nieves',
                        img: 'https://graph.facebook.com/v7.0/100009856542939/picture',
                        url: 'https://fb.me/yuri.nieves.77'
                    },
                    {
                        name: 'Richard Floyd Franco Eliedo',
                        img: 'https://graph.facebook.com/v7.0/100014763018479/picture',
                        url: 'https://fb.me/richardfloyd.eliedo.984'
                    },
                    {
                        name: 'Paul Jero Denosta',
                        img: 'https://graph.facebook.com/v7.0/100001850754615/picture',
                        url: 'https://fb.me/pauljero.denosta'
                    },
                    {
                        name: 'Julius Cesar DeLa Pena',
                        img: 'https://graph.facebook.com/v7.0/100006936342555/picture',
                        url: 'https://fb.me/DotaPlayerofPeenoise'
                    },
                    {
                        name: 'Roldan Icban Lumbang',
                        img: 'https://graph.facebook.com/v7.0/100019584420899/picture',
                        url: 'https://fb.me/roldan.lumbang.37'
                    },
                    {
                        name: 'Face of Lord',
                        img: images('./contributor.png')
                    }
                ]
            }
        }
    }
</script>

<style scoped>

    a, span {
        margin: 5px;
        display: inline-block;
        border: 1px solid #ccc;
        background-color: #ccc;
        border-radius: 10px;
        overflow: hidden;
    }

</style>