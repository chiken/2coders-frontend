<template>
  <v-container>
    <v-card @click="showFruit(fruit._id)">
      <v-img
        :src="fruit.img"
        contain
        class="white--text align-end"
        height="300px"
      >
      </v-img>

      <v-card-actions>
        <v-card-title v-text="fruit.name"></v-card-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="updateFruit(fruit._id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon @click.stop="dialog = true">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dialog" width="280">
        <v-card>
          <v-card-title class="headline"
            >¿Seguro que quieres eliminar esta fruta?</v-card-title
          >

          <v-card-actions>
            <v-btn color="green darken-1" text @click="dialog = false">
              Volver
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="red" text @click="deleteEvent(fruit._id, idx)">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import APIServices from "../services/Api";

export default {
  data() {
    return {
      show: false,
      dialog: false
    };
  },
  methods: {
    deleteEvent(fruitId, idx) {
      APIServices.deleteFruit(fruitId)
        .then(() => {
          this.deleteFruit(idx);
          this.dialog = false;
        })
        .catch(err => console.log(err));
    },
    showFruit(id) {
      this.$router.push(`/view/${id}`);
    },
    updateFruit(id) {
      this.$router.push(`/update/${id}`);
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
