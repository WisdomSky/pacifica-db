<template>
  <page-container>
    <div class="banner mb-4">
      <img src="../assets/banner.jpg" alt="">
    </div>
    <h3>Welcome to Hello PO!</h3>
    <hr>
    <p>
      <a href="/">Hello PO</a> is a community-run organization which aims to gather and provide information to Pacifica
      Online players.
    </p>
    <p>
      We are not affiliated with the makers of Pacifica Online.
      <br>
      Avoid entertaining people claiming to be one of us who asks for your password.
    </p>
    <h4 class="mt-5">Contributors</h4>
    <contributors></contributors>
  </page-container>
</template>

<script>

export default {
}
</script>


<style lang="scss" scoped>
  .banner {
    margin-top: -25px;
    max-height: 250px;
    overflow: hidden;
    img {
      margin-top: -60px;
      width: 100%;

      @media all and (max-width: 800px) {
        margin-top: 0;
      }

    }
  }
</style>