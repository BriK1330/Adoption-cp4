<template>
  <div class="adding">
  <div class="heading">
    <div class="circle">1</div>
    <h2>Adopt an Animal</h2>
  </div>
  <div class="adopt">
    <div class="form">
      <input v-model="findAnimal" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectAnimal(s)">{{s.name}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findAnimal">
      <input v-model="findAnimal.name">
      <p></p>
      <input v-model="findAnimal.species">
      <p></p>
      <img :src="findAnimal.path" />
      <p></p>
      <textarea v-model="findAnimal.description"></textarea>
    </div>
    <div class="actions" v-if="findAnimal">
      <button @click="deleteAnimal(findAnimal)">Adopt</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Add',
  data() {
    return {
      name: "",
      file: null,
      addAnimal: null,
      animals: [],
      findName: "",
      findAnimal: null,
      species: "",
      description: ""
    }
  },
  computed: {
    suggestions() {
      let animals = this.animals.filter(animal => animal.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return animals.sort((a, b) => a.name > b.name);
    }
  },
  created() {
    this.getAnimals();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/animals', {
          name: this.name,
          species: this.species,
          path: r1.data.path,
          description: this.description
        });
        this.addAnimal = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAnimals() {
      try {
        let response = await axios.get("/api/animals");
        this.animals = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectAnimals(animal) {
      this.findName = "";
      this.findAnimal = animal;
    },
    async deleteAnimal(animal) {
      try {
        await axios.delete("/api/animals/" + animal._id);
        this.findAnimal = null;
        this.getAnimals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editAnimal(animal) {
      try {
        await axios.put("/api/animals/" + animal._id, {
          name: this.findAnimal.name,
          description: this.findAnimal.description
        });
        this.findAnimal = null;
        this.getAnimals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.adding,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>
