<template>
  <div>
    <ul>
      <li>Copyright - {{ date.getFullYear() }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      date: new Date()
    }
  }
}
</script>

<style scoped lang="scss">
div {
  background-color: black;
  color: #fff;
  padding: 0.2rem;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>