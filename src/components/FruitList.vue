<template>
  <div>
    <v-row>
      <v-col xs="12" md="6">
        <v-text-field class="mx-5" label="Buscador" append-icon="mdi-magnify" />
      </v-col>

      <v-col xs="12" md="6" lg="4">
        <v-btn class="ma-2" tile color="indigo" dark to="/new">
          Añadir nueva fruta
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col xs="12" md="6" lg="4" v-for="(fruit, idx) in fruits" :key="idx">
        <FruitCard :fruit="fruit" :idx="idx" :deleteFruit="deleteFruit" />
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
  methods: {
    deleteFruit(idx) {
      this.fruits.splice(idx, 1);
    }
  },
  mounted() {
    APIServices.getProducts().then(response => {
      this.fruits = response;
    });
  }
};
</script>

<style lang="scss" scoped></style>
