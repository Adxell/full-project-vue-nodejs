
<template>
  <router-link to="/">Home</router-link>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }

  main {
    width: 100%;
  }
}
</style>
