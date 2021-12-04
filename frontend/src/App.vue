<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/crown.png">
      </div>
    </router-link>
    <div class="title">
      <h1>King Adoption Clinic</h1>
    </div>
    <div class="adopt">
      <router-link to="/adopt">Adopt Animal</router-link>
    </div>
    <div class="add">
      <router-link to="/add">Add Animal</router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <!-- <a href="https://github.com/BYUCS260/museum-BriK1330">Github</a> -->
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #040b78;
  color: #bf9e08;
  align-items: center;
  align-content: center;
}

.header router-link {
  color: #bf9e08;
}

.logo img {
  max-width: 80px;
  max-height: 80px;
}

.title {
  margin-top: 5px;
  padding-left: 15px;
  justify-content: center;
}

.title h1 {
  justify-content: center;
  font-size: 35px;
}
.header .adopt {
  padding-left: 40%;
  justify-content: flex-end;
}
.header .add {
  padding-left: 5%;
  justify-content: flex-end;
}
.content {
  padding: 20px 100px;
  min-height: 500px;
  background-color: #9e99ba;

}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
  background-color: #040b78;
}

.footer a {
  align-items:flex-end;
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
