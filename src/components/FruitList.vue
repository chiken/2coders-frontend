<template>
  <div>
    <v-row>
      <v-col xs="12" md="6">
        <v-text-field
          v-model="search"
          @keyup="updateSearch"
          class="mx-5"
          label="Buscador"
          append-icon="mdi-magnify"
        />
      </v-col>

      <v-col xs="12" md="6" lg="4">
        <v-btn class="ma-2" tile color="#BEE9D3" to="/new">
          Añadir nueva fruta
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="fruits.length !== 0">
      <v-col xs="12" md="6" lg="4" v-for="(fruit, idx) in fruits" :key="idx">
        <FruitCard :fruit="fruit" :idx="idx" :deleteFruit="deleteFruit" />
      </v-col>
    </v-row>

    <span v-else class="span"> No se encuentra ninguna fruta </span>
  </div>
</template>

<script>
import APIServices from "../services/Api";
import FruitCard from "@/components/FruitCard.vue";

export default {
  data() {
    return {
      fruits: [],
      search: ""
    };
  },
  components: {
    FruitCard
  },
  methods: {
    deleteFruit(idx) {
      this.fruits.splice(idx, 1);
    },
    updateSearch() {
      APIServices.getFruits(this.search).then(response => {
        this.fruits = response;
      });
    }
  },
  mounted() {
    APIServices.getFruits("").then(response => {
      this.fruits = response;
    });
  }
};
</script>

<style lang="scss" scoped>
.span {
  display: block;
  margin: auto !important;
  text-align: center;
  padding: 100px;
  color: #717d7e;
}
</style>
