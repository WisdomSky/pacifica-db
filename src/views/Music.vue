<template>
    <page-container>
        <h3>
            <!--<a :href="currentSrc" class="float-right btn btn-sm btn-info" download>Download this music</a>-->
            Music
        </h3>


        <page-section class="my-4" style="font-size: 12px">
            <strong>A WISE TIP: </strong>Play your own selection of music while playing the game!
            <hr class="m-1">
            Just go to <strong>Options</strong> &gt;
            <strong>Sounds</strong> &gt; <u>Check</u> the <strong class="text-danger">Mute Background Music</strong> to disable the in-game
            background music.<br>Then start playing the music you want from the music player below. :)<br><br>
            Now, you don't need to go to that map where your favorite Pacifica Online music only plays. Play it everywhere! ;)
            <br>
            Enjoy!
        </page-section>

        <div>
            <vue-aplayer autoplay :music="current" :list="list" :autoplay="false" @loadstart="onChange"/>
        </div>



    </page-container>
</template>

<script>

    import musics from '../assets/bgms'
    import _ from 'lodash'

    export default {
        data() {

            let music_dir = require.context('../assets/music/mp3', false, /\.mp3/);

            let list = music_dir.keys()
                .map(music => music.replace(/^\.\/(.*)\.mp3$/, '$1'))
                .sort((a, b) => {
                    if (!isNaN(a[0])) {
                        return -1;
                    } else if (!isNaN(b[0])) {
                        return -1;
                    }
                    return a.localeCompare(b);
                })
                .map((music) => {
                    return {
                        title : music,
                        artist: 'Pacifica Online',
                        src   : music_dir(`./${music}.mp3`),
                        pic   : require('../assets/logo.png')
                    }
                });


            return {
                currentSrc: list[0].src,
                current: list[0],
                list
            }
        },
        methods: {
            onChange(e) {
                this.currentSrc = e.target.currentSrc;
            }
        }
    }
</script>


<style lang="scss" scoped>


    ::v-deep .aplayer {
        overflow: initial;
    }
    ::v-deep .aplayer-body {
        position: sticky !important;
        top: 0;
        background-color: #fff;
        z-index: 1;
    }
</style>