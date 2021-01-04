<template>
    <page-container wide>
        <h3>Gallery</h3>


        <page-section class="my-4">
            <a href="#" class="text-info" @click.prevent="type = 'all'">All</a>
            | <a href="#" class="text-info" @click.prevent="type = 'game'">Gameplay</a>
            | <a href="#" class="text-info" @click.prevent="type = 'art'">Artworks</a>
            | <a href="#" class="text-info" @click.prevent="type = 'video'">Videos</a>
        </page-section>

        <vue-gallery :images="images" :index="index" @close="index = null"></vue-gallery>
        <div style="min-height: 150px">

            <div ref="packery" v-packery='{itemSelector: ".image", percentPosition: true}'>

                <div v-packery-item
                     class="image"
                     v-for="content, i in filtered"
                     @click="index = i">
                    <img :src="content.src" @load="layout">
                    <div class="author">
                        By: <strong>{{ content.author}}</strong>
                    </div>
                </div>

            </div>

        </div>
        <page-section class="my-4 text-center" style="font-size: 12px">
            You may submit your own content into the gallery by sending an email to
            <email subject="Hello PO: Gallery Entry Submission" body="(Note: Make sure to state your name and attach your image content into this email)"></email>.
        </page-section>

    </page-container>
</template>

<script>
    import {packeryEvents} from 'vue-packery-plugin'

    export default {
        data() {


            let gallery = require.context('../assets/gallery/', false, /\.(jpg|png)/);

            return {
                type   : 'all',
                content: [

                    {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d5mib4b-cd835acd-0c2a-4720-b9e2-ebe9b56c0a84.jpg/v1/fill/w_400,h_800,q_75,strp/pacifica_cleric_by_justineart_d5mib4b-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MDAiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q1bWliNGItY2Q4MzVhY2QtMGMyYS00NzIwLWI5ZTItZWJlOWI1NmMwYTg0LmpwZyIsIndpZHRoIjoiPD00MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.X8APps_ICppkAtt9dBxKKCkxPokgvP3A_N_orsnYOx4',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d5mib35-9e665e75-16cb-4da4-b31d-8dea77a8471c.jpg/v1/fill/w_400,h_800,q_75,strp/pacifica_archer_by_justineart_d5mib35-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MDAiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q1bWliMzUtOWU2NjVlNzUtMTZjYi00ZGE0LWIzMWQtOGRlYTc3YTg0NzFjLmpwZyIsIndpZHRoIjoiPD00MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.VKnq5GjIHgFlmMvjW8BBb-mERk461fO_anZuKSskc-I',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d5mib1u-3cf7ce03-8ab3-44d8-83e6-ba899a33841a.jpg/v1/fill/w_400,h_800,q_75,strp/pacifica_bandit_by_justineart_d5mib1u-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MDAiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q1bWliMXUtM2NmN2NlMDMtOGFiMy00NGQ4LTgzZTYtYmE4OTlhMzM4NDFhLmpwZyIsIndpZHRoIjoiPD00MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Ty8euTMbAUGxzvfLj_J2ophKxCt7ja02gaUuWzjuOd4',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d5miaw7-affe7a83-1908-42d8-9860-1f024eec4241.jpg/v1/fill/w_400,h_800,q_75,strp/pacifica_swordsman_by_justineart_d5miaw7-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MDAiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q1bWlhdzctYWZmZTdhODMtMTkwOC00MmQ4LTk4NjAtMWYwMjRlZWM0MjQxLmpwZyIsIndpZHRoIjoiPD00MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9dXyIzXrdcJLnWXeRcBAsraeJy6fTyEJs13r6oH_l3o',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d9pdnxy-35d4c6f2-d26a-43a0-a76a-03e4bcf7b9ef.jpg/v1/fill/w_1192,h_670,q_70,strp/deacon_by_justineart_d9pdnxy-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDgwIiwicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kOXBkbnh5LTM1ZDRjNmYyLWQyNmEtNDNhMC1hNzZhLTAzZTRiY2Y3YjllZi5qcGciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.dN9KR4UjH2WWoyF9-m0xL_50m5qjd6fkOf1cWeSZkbc',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d9pdo2l-683265e0-31e0-4f93-96b5-8b479f7d0d04.jpg/v1/fill/w_1192,h_670,q_70,strp/dryad_vs_knight_by_justineart_d9pdo2l-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDgwIiwicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kOXBkbzJsLTY4MzI2NWUwLTMxZTAtNGY5My05NmI1LThiNDc5ZjdkMGQwNC5qcGciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.e9AmI7ypLihCy8JaxHaNTkSmPp7zDDha3One1IO2v1c',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d9pdnmc-b95ad792-0a8b-48c3-8d24-cd3ad7101cab.jpg/v1/fill/w_900,h_1200,q_75,strp/ranger_by_justineart_d9pdnmc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjAwIiwicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kOXBkbm1jLWI5NWFkNzkyLTBhOGItNDhjMy04ZDI0LWNkM2FkNzEwMWNhYi5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.uR78xSOTJ_ebrbgeF8ecsjOImKFlDtBXRe9jOK29hBk',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d9pdni3-a68554d8-230f-4018-8479-5024aff5af49.jpg/v1/fill/w_900,h_1200,q_75,strp/bandit_by_justineart_d9pdni3-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjAwIiwicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kOXBkbmkzLWE2ODU1NGQ4LTIzMGYtNDAxOC04NDc5LTUwMjRhZmY1YWY0OS5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.6va2Fy0XZq-B-LoMvZGBTQEHjvHT4-i5XGb0wOjCdhQ',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d9pdng1-62a4fc79-5960-44c1-9d47-156d301b791f.jpg/v1/fill/w_800,h_1120,q_75,strp/cleric_by_justineart_d9pdng1-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMTIwIiwicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kOXBkbmcxLTYyYTRmYzc5LTU5NjAtNDRjMS05ZDQ3LTE1NmQzMDFiNzkxZi5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.48PxhjekSyrE8hijxTrZlVHjOxqo1vFW7bLotoxp7pQ',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d9pdn9g-06b68b58-e578-4ed0-8567-d5cec6294274.jpg/v1/fill/w_600,h_800,q_75,strp/knight_by_justineart_d9pdn9g-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MDAiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q5cGRuOWctMDZiNjhiNTgtZTU3OC00ZWQwLTg1NjctZDVjZWM2Mjk0Mjc0LmpwZyIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.gwn-t5HgaJsc2KmQUXRqF_SOoqQFttLP7yN4EGUDqlQ',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d7vwnuj-b9fca6a6-f08f-407d-ad21-eada18f075eb.jpg/v1/fill/w_800,h_450,q_75,strp/pacifica_online_wallpaper_by_justineart_d7vwnuj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD00NTAiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q3dndudWotYjlmY2E2YTYtZjA4Zi00MDdkLWFkMjEtZWFkYTE4ZjA3NWViLmpwZyIsIndpZHRoIjoiPD04MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.dUiUVIeKkYfHw6P4B3nj2J4tRA5Hmv6p9aWAIblHRME',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d7l2o45-056f7419-80e6-4dbe-851c-7c3add70edcd.jpg/v1/fill/w_1024,h_576,q_75,strp/time_for_adventure__by_justineart_d7l2o45-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD01NzYiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q3bDJvNDUtMDU2Zjc0MTktODBlNi00ZGJlLTg1MWMtN2MzYWRkNzBlZGNkLmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.kI3P7l42zkamoGmEDH4vjRodY_Bq1YS3NE2xMzchOJ8',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d7xnvw2-a523ccd8-6240-4b05-8cbc-c6133d70047c.jpg/v1/fill/w_800,h_895,q_75,strp/nexus_shadow_by_justineart_d7xnvw2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04OTUiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q3eG52dzItYTUyM2NjZDgtNjI0MC00YjA1LThjYmMtYzYxMzNkNzAwNDdjLmpwZyIsIndpZHRoIjoiPD04MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Bpx20FWtMWIK-jVt7Z3GIPdiQ5bp7EzWPaX0mud0rzk',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d8acv5x-4a5ec410-8579-4e59-9387-413ad34bb1a0.jpg/v1/fill/w_900,h_1125,q_75,strp/mobs_batch_11_14_by_justineart_d8acv5x-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMTI1IiwicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kOGFjdjV4LTRhNWVjNDEwLTg1NzktNGU1OS05Mzg3LTQxM2FkMzRiYjFhMC5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.6sxgwNWg2mT2alRARIPeXoYVsiYkXOSaN04pBWWbht4',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d60cgim-e23adfcc-ded0-4ff1-be55-3e61166f713b.jpg/v1/fill/w_400,h_306,q_75,strp/pacifica_online_valentines_day_by_justineart_d60cgim-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0zMDYiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q2MGNnaW0tZTIzYWRmY2MtZGVkMC00ZmYxLWJlNTUtM2U2MTE2NmY3MTNiLmpwZyIsIndpZHRoIjoiPD00MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7nvK4FmNGh2gy12e9RceB43Rp4rCHycKGI8jE3xx1Hw',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d5mhux7-d4cf58b9-6657-456a-9b0a-987ee70a3fa8.jpg/v1/fill/w_900,h_540,q_75,strp/pacifica_online_2012_december_title_screen_by_justineart_d5mhux7-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD01NDAiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q1bWh1eDctZDRjZjU4YjktNjY1Ny00NTZhLTliMGEtOTg3ZWU3MGEzZmE4LmpwZyIsIndpZHRoIjoiPD05MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.1Item_BlazC31jJ59_pQ7RIxGZWQ2XN60c44ILWOv8s',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d36xhbg-6f2cedbb-b1bd-432e-a627-58f3c0128623.jpg/v1/fill/w_900,h_1107,q_75,strp/pacifica_online___dryad_by_justineart_d36xhbg-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMTA3IiwicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kMzZ4aGJnLTZmMmNlZGJiLWIxYmQtNDMyZS1hNjI3LTU4ZjNjMDEyODYyMy5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.h2hVH-xvfD60P3Ff70Xx74t489ds5o72EgyRTjL0x5w',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d48wk3h-cbb9b419-e977-4854-89f8-7511ebb34ec4.jpg/v1/fill/w_600,h_875,q_75,strp/crypter_by_justineart_d48wk3h-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04NzUiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q0OHdrM2gtY2JiOWI0MTktZTk3Ny00ODU0LTg5ZjgtNzUxMWViYjM0ZWM0LmpwZyIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.E2dZm6bQfvEYJ9_XEkVGGJZF0ZqFn5k_a1fW28G4-38',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d32j2fh-23e5f2c5-c896-4c5e-927c-170b55d1e398.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kMzJqMmZoLTIzZTVmMmM1LWM4OTYtNGM1ZS05MjdjLTE3MGI1NWQxZTM5OC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.P-AycPxPOhHrdhyW6OC3Td4RKR6pB94lGmF6Oal1Mz4',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d4q0fut-a8cb2d1b-2252-4311-937c-dd5391d5c542.jpg/v1/fill/w_900,h_877,q_75,strp/pacifica_valentine_by_justineart_d4q0fut-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04NzciLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q0cTBmdXQtYThjYjJkMWItMjI1Mi00MzExLTkzN2MtZGQ1MzkxZDVjNTQyLmpwZyIsIndpZHRoIjoiPD05MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6OMBNF9yrgdVZAck2s2cu94xn136apDC_wp7dJ71hU8',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d6qftwe-0ee529a7-b087-4dc0-8fc1-61c511f29f1f.jpg/v1/fill/w_800,h_632,q_75,strp/i_ll_gonna_catch_yah_by_justineart_d6qftwe-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02MzIiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q2cWZ0d2UtMGVlNTI5YTctYjA4Ny00ZGMwLThmYzEtNjFjNTExZjI5ZjFmLmpwZyIsIndpZHRoIjoiPD04MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hpLpK_UI7pLA2fhZvrzVP26sQKXRqWdMtv1tXmriEzs',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d6u6nc7-b332d56c-9342-4e8d-9831-a00506afbac5.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjdlZjliMWEtYTcyZS00OGY0LWE3YWItOTBkNzNhMzZjYzBkXC9kNnU2bmM3LWIzMzJkNTZjLTkzNDItNGU4ZC05ODMxLWEwMDUwNmFmYmFjNS5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.K8zcRA0-84aYm6p1sYDMGNur0rZsdlVp6r_GmsfA3w0',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7ef9b1a-a72e-48f4-a7ab-90d73a36cc0d/d70fqov-f923a385-a042-4507-a217-781a33738e36.jpg/v1/fill/w_600,h_671,q_75,strp/knight_by_justineart_d70fqov-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02NzEiLCJwYXRoIjoiXC9mXC9mN2VmOWIxYS1hNzJlLTQ4ZjQtYTdhYi05MGQ3M2EzNmNjMGRcL2Q3MGZxb3YtZjkyM2EzODUtYTA0Mi00NTA3LWEyMTctNzgxYTMzNzM4ZTM2LmpwZyIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.wdnWC7ZPLMVNvh3dJz1e-8_gv4SlUIuERqKw1i7WiWo',
                        author: 'Justine Torrevillas',
                        type  : 'art',
                        date  : '2020-05-26 12:00:00'
                    }, {
                        src   : gallery('./1.jpg'),
                        author: 'Andrei Mallari‎',
                        type  : 'game',
                        date  : '2020-05-26 12:39:00'
                    }, {
                        src   : gallery('./2.jpg'),
                        author: 'Lance',
                        type  : 'game',
                        date  : '2020-05-26 12:39:00'
                    }, {
                        src   : gallery('./3.jpg'),
                        author: 'Mhaynard Aaron Catli Lapuz‎',
                        type  : 'game',
                        date  : '2020-05-26 12:39:00'
                    }, {
                        src   : gallery('./4.jpg'),
                        author: 'Lawrence Litada Casuco‎‎',
                        type  : 'game',
                        date  : '2020-05-26 12:39:00'
                    }, {
                        src   : gallery('./5.jpg'),
                        author: 'Ian Macasaddu‎',
                        type  : 'game',
                        date  : '2020-05-26 12:39:00'
                    }, {
                        src   : gallery('./6.jpg'),
                        author: 'Gagatiga Kevin‎‎',
                        type  : 'game',
                        date  : '2020-05-26 12:39:00'
                    }, {
                        src   : gallery('./7.jpg'),
                        author: 'Keneth Altiveros',
                        type  : 'game',
                        date  : '2020-05-26 20:48:00'
                    }, {
                        src   : gallery('./8.png'),
                        author: 'Semarson Mendrez',
                        type  : 'game',
                        date  : '2021-01-04 9:30:00'
                    }

                ],
                index  : null
            };
        },
        computed: {
            filtered() {
                return this.content.filter((content) => {

                    if (this.type === 'all') {
                        return true;
                    }

                    return content.type === this.type

                }).sort((a, b) => {
                    return b.date.localeCompare(a.date)
                });
            },
            images() {
                return this.filtered.map((content) => {
                    return content.src
                })
            },
        },
        watch   : {
            async images() {
                await this.$nextTick();
                setTimeout(() => {
                    this.layout()
                }, 1000)
            }
        },
        methods : {
            layout() {
                packeryEvents.$emit('layout', this.$refs.packery)

            }
        }
    }
</script>


<style lang="scss" scoped>

    .image {
        position: relative;
        background-size: cover;
        background: no-repeat center center;
        border: 1px solid #ebebeb;
        margin: 0;
        box-sizing: border-box;
        width: 25%;

        .author {
            position: absolute;
            bottom: 0;
            width: 100%;
            background-color: rgba(50,50,50,0.75);
            color: #fff;
            font-size: 11px;
            box-sizing: border-box;
            padding: 5px;



        }

        img {
            width: 100%;
        }


        @media all and (max-width: 540px) {
            width: 33%;

            .author {
                font-size: 8px;
            }
        }


    }

</style>
