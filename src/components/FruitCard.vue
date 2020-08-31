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

        <v-btn icon>
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    fruit: Object
  }
};
</script>

<style lang="scss" scoped></style>
