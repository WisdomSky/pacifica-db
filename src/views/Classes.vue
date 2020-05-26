<template>
  <page-container>
    <h3 class="mb-4">Classes</h3>

    <p class="mb-5">There are four classes to choose from in Pacifica online.</p>

    <b-container>
      <b-row>
          <b-col :cols="6" :md="3" class="text-center">
            <div>
              <img src="../assets/classes/swordsman.png" alt="">
            </div>
            <div class="mt-3">
              <h5>Swordsman</h5>
            </div>
          </b-col>
          <b-col :cols="6" :md="3"  class="text-center">
            <div>
              <img src="../assets/classes/waif.png" alt="">
            </div>
            <div class="mt-3">
              <h5>Waif</h5>
            </div>
          </b-col>
          <b-col :cols="6" :md="3"  class="text-center">
            <div>
              <img src="../assets/classes/archer.png" alt="">
            </div>
            <div class="mt-3">
              <h5>Archer</h5>
            </div>
          </b-col>
          <b-col :cols="6" :md="3"  class="text-center">
            <div>
              <img src="../assets/classes/deacon.png" alt="">
            </div>
            <div class="mt-3">
              <h5>Deacon</h5>
            </div>
          </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col class="text-center text-info">
            Select a class you're interested to know more...
        </b-col>
      </b-row>
    </b-container>

  </page-container>
</template>

<script>

  import skills from '../assets/skills'

export default {
  name: 'Home',
}
</script>
