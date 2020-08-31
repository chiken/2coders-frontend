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
              :src="previewImage"
              class="white--text align-end"
              height="500px"
            />
          </v-col>
          <v-col sm="12" md="6">
            <v-text-field v-model="name" label="Nombre" />
            <v-text-field v-model="color" class="mt-5" label="Color" />
            <v-select v-model="size" :items="items" label="Tamaño" />
            <v-btn
              class="btn"
              color="indigo"
              width="200px"
              :loading="loading"
              :disabled="loading"
              @click="loader = 'loading'"
            >
              Añadir fruta

              <template v-slot:loader>
                <span>Agregando fruta...</span>
              </template>
            </v-btn>
            <span id="span" v-if="error">
              Todos los campos son requeridos*
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import APIServices from "../services/Api";

export default {
  data() {
    return {
      disabled: false,
      loader: null,
      name: "",
      color: "",
      size: "",
      error: false,
      loading: false,
      selectedFile: "",
      previewImage:
        "https://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/camera.jpg",
      items: ["Pequeño", "Mediano", "Grande"]
    };
  },
  watch: {
    async loader() {
      if (this.checkInputs()) {
        const l = this.loader;
        this[l] = !this[l];
        const imgURL = await this.uploadImage();

        const newFruit = {
          name: this.name,
          color: this.color,
          size: this.size,
          img: imgURL
        };

        APIServices.addFruit(newFruit).then(() => {
          this[l] = false;
          this.loader = null;
          this.$router.push("/");
        });
      } else {
        this.loader = null;
        this.error = true;
      }
    }
  },
  methods: {
    onFileSelected(event) {
      const file = event;
      if (file) {
        let reader = new FileReader();
        reader.onload = e => {
          this.previewImage = e.target.result;
          this.selectedFile = file;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage =
          "https://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/camera.jpg";
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
    checkInputs() {
      return (
        this.selectedFile.length !== 0 &&
        this.name.length !== 0 &&
        this.color.length !== 0 &&
        this.size.length !== 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  display: block;
  margin: auto;
  margin-top: 40px;
  color: white;
}

#span {
  display: block;
  margin-top: 40px !important;
  text-align: center;
  color: red;
}
</style>
