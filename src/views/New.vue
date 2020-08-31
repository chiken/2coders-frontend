<template>
  <div>
    <v-row class="ma-5" justify="center">
      <v-col sm="12" md="10">
        <v-row>
          <v-col sm="12" md="6">
            <v-img
              src="https://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/camera.jpg"
              class="white--text align-end"
              height="500px"
            />
          </v-col>
          <v-col sm="12" md="6">
            <v-text-field class="mt-5" label="Nombre" />
            <v-text-field class="mt-5" label="Color" />
            <v-text-field class="mt-5" label="Tamaño" />
            <v-btn
              class="btn"
              color="indigo"
              :dark="dark"
              :disabled="disabled"
              width="200px"
            >
              Añadir fruta
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      dark: true
    };
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
