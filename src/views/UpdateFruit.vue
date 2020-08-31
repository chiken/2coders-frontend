<template>
  <div>
    <v-row class="ma-5" justify="center">
      <v-col sm="12" md="10">
        <v-row>
          <v-col sm="12" md="6">
            <v-file-input
              label="Elige la imagen"
              @change="onFileSelected"
            ></v-file-input>
            <v-img
              :src="src"
              class="white--text align-end"
              height="500px"
              contain
            />
          </v-col>
          <v-col sm="12" md="6">
            <v-text-field v-model="name" label="Nombre" />
            <v-text-field v-model="color" class="mt-5" label="Color" />
            <v-select v-model="size" :items="items" label="Tamaño" />

            <v-row class="mt-16">
              <v-col xs="4" sm="6">
                <v-btn
                  :disabled="loading"
                  class="btn"
                  color="#BEE9D3"
                  width="200px"
                  @click="goBack"
                >
                  Volver
                </v-btn>
              </v-col>

              <v-col xs="4" sm="6">
                <v-btn
                  class="btn"
                  color="#E4E9BE"
                  width="200px"
                  :loading="loading"
                  :disabled="checkInputs || loading"
                  @click="loader = 'loading'"
                >
                  Actualizar

                  <template v-slot:loader>
                    <span>Actualizando fruta...</span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import APIServices from "../services/Api";
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      color: "",
      size: "",
      src: "",
      items: ["Pequeño", "Mediano", "Grande"],
      selectedFile: "",
      loading: false,
      loader: null,
      backUpName: "",
      backUpColor: "",
      backUpSize: "",
      backUpSrc: ""
    };
  },
  watch: {
    async loader() {
      const l = this.loader;
      this[l] = !this[l];

      const fruitUpdated = {};

      if (this.selectedFile.length !== 0) {
        const imgURL = await this.uploadImage();
        fruitUpdated.img = imgURL;
      }

      fruitUpdated.name = this.name;
      fruitUpdated.color = this.color;
      fruitUpdated.size = this.size;

      APIServices.updateFruit(fruitUpdated, this.$route.params.id).then(() => {
        this[l] = false;
        this.loader = null;
        this.$router.push("/");
      });
    }
  },
  methods: {
    onFileSelected(event) {
      const file = event;
      if (file) {
        let reader = new FileReader();
        reader.onload = e => {
          this.src = e.target.result;
          this.selectedFile = file;
        };
        reader.readAsDataURL(file);
      } else {
        this.src = this.backUpSrc;
        this.selectedFile = "";
      }
    },
    uploadImage() {
      return new Promise(resolve => {
        var storageRef = firebase.storage().ref();
        var metadata = {
          contentType: "image/jpeg"
        };
        var uploadTask = storageRef
          .child("images/" + this.selectedFile.name)
          .put(this.selectedFile, metadata);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          error => console.log(error),
          async function() {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            resolve(downloadURL);
          }
        );
      });
    },
    goBack() {
      this.$router.push("/");
    }
  },
  computed: {
    checkInputs() {
      return (
        this.backUpName === this.name &&
        this.backUpColor === this.color &&
        this.backUpSize === this.size &&
        this.selectedFile.length === 0
      );
    }
  },
  mounted() {
    APIServices.getFruitByID(this.$route.params.id)
      .then(response => {
        this.name = response[0].name;
        this.backUpName = response[0].name;
        this.color = response[0].color;
        this.backUpColor = response[0].color;
        this.size = response[0].size;
        this.backUpSize = response[0].size;
        this.src = response[0].img;
        this.backUpSrc = response[0].img;
      })
      .catch(err => console.log(err));
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
