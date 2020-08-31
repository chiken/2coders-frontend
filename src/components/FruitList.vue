<template>
  <div>
    <v-row>
      <v-col xs="12" md="6">
        <v-text-field
          class="mx-5"
          label="Search"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col xs="12" md="6" lg="4" v-for="(fruit, idx) in fruits" :key="idx">
        <FruitCard :fruit="fruit" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import APIServices from "../services/Api";
import FruitCard from "@/components/FruitCard.vue";

export default {
  data() {
    return {
      fruits: []
    };
  },
  components: {
    FruitCard
  },
  mounted() {
    APIServices.getProducts().then(response => {
      this.fruits = response;
    });
  }
};
</script>

<style lang="scss" scoped></style>
