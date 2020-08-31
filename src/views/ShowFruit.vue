<template>
  <div>
    <v-row class="ma-5" justify="center">
      <v-col sm="12" md="10">
        <v-row>
          <v-col sm="12" md="6">
            <v-img
              :src="src"
              class="white--text align-end"
              contain
              height="500px"
            />
          </v-col>
          <v-col class="mt-16" sm="12" md="6">
            <v-text-field v-model="name" label="Nombre" readonly />
            <v-text-field v-model="color" class="mt-5" label="Color" readonly />
            <v-text-field v-model="size" class="mt-5" label="Color" readonly />
            <v-btn class="btn" color="#BEE9D3" width="200px" @click="goBack">
              Volver
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import APIServices from "../services/Api";

export default {
  data() {
    return {
      name: "",
      color: "",
      size: "",
      src: ""
    };
  },
  mounted() {
    APIServices.getFruitByID(this.$route.params.id)
      .then(response => {
        this.name = response[0].name;
        this.color = response[0].color;
        this.size = response[0].size;
        this.src = response[0].img;
      })
      .catch(err => console.log(err));
  },
  methods: {
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  display: block;
  margin: auto;
  margin-top: 40px;
}
</style>
