<template>
  <div class="home">
    <FruitList />
  </div>
</template>

<script>
import FruitList from "@/components/FruitList.vue";

export default {
  name: "Home",
  components: {
    FruitList
  }
};
</script>
