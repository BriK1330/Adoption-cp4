<template>
  <div class="home">
    <section class="animal-pictures">
      <div class="image" v-for="animal in animals" :key="animal.id">
        <h2>{{animal.name}}</h2>
        <img :src="animal.path" />
        <p><em>{{animal.description}}</em>{{animal.description}}</p>
      </div>
    </section>
  </div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     animals: [],
    }
  },
  created() {
    this.getAnimals();
  },
  methods: {
    async getAnimals() {
      try {
        let response = await axios.get("/api/animals");
        this.animals = response.data;
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
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.animal-pictures {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .animal-pictures {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .animal-pictures {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .animal-pictures {
    column-count: 2;
  }
}
</style>
