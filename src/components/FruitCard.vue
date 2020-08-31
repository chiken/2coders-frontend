<template>
  <v-container>
    <v-card>
      <v-img :src="fruit.img" class="white--text align-end" height="300px">
      </v-img>

      <v-card-actions>
        <v-card-title v-text="fruit.name"></v-card-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon @click="deleteEvent(fruit._id, idx)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import APIServices from "../services/Api";

export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    deleteEvent(fruitId, idx) {
      APIServices.deleteFruit(fruitId)
        .then(() => {
          this.deleteFruit(idx);
        })
        .catch(err => console.log(err));
    }
  },
  props: {
    fruit: Object,
    idx: Number,
    deleteFruit: Function
  }
};
</script>

<style lang="scss" scoped></style>
