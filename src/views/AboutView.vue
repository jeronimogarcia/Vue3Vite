<template>
  <div class="mb-16 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">About</h1>
  </div>

  <div class="flex flex-row container rounded">
    <div>
      <div class="flex flex-col p-10">
        <div class="text-xl font-medium">
          <p class="">
            <span>App desarrollada por: </span
            ><span class="text-2xl">Jerónimo García</span>
          </p>
          <p>
            Github:
            <a href="https://github.com/jeronimogarcia" target="_blank"
              >https://github.com/jeronimogarcia
            </a>
          </p>
          <p>
            LinkedIn:
            <a
              href="https://www.linkedin.com/in/jeronimogarciacoding/"
              target="_blank"
              >https://www.linkedin.com/in/jeronimogarciacoding/
            </a>
          </p>
        </div>
        <div class="mt-4 text-lg">
          <h2 class="text-center text-2xl font-normal mb-2">
            Tecnologías y dependencias utilizadas
          </h2>
          <p>Vite: herramienta de frontend</p>
          <p>Vue 3 composition API</p>
          <p>Pinia (Vuex5): gestión de estados</p>
          <p>Vue router 4x:</p>
          <ol>
            <li>Router-link</li>
            <li>Router-view</li>
            <li>Dynamic ruotes</li>
            <li>Navigation guards</li>
          </ol>
          <p>LocalStorage</p>
          <p>SessionStorage</p>
          <p>Tailwind & Bootstrap: estilos</p>
          <p>Git: control de versión local y remoto</p>
          <p>Github: control de versión remoto</p>
          <p>Vercel: hosting</p>
          <p>Vuelidate: validaciones y armado de formularios</p>
          <p>Fontawesome: íconos</p>
          <p>Firebase:</p>
          <ol>
            <li>Firestore lite: CRUD</li>
            <li>Firestore cloud: NoSQL database</li>
            <li>
              Firestore authentication: creación y permanencia de usuarios
            </li>
            <li>Firestore store: guardado de imágenes</li>
            <li>Firestore database: guardado de colecciones</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="flex flex-col imagesContainer">
      <img src="../assets/Vite/vite.svg" alt="vite" />
      <img src="../assets/Vue3/vue.svg" alt="vue3" />
      <img src="../assets/Pinia/pinia.svg" alt="pinia" />
      <img src="../assets/Tailwind/tailwind.svg" alt="tailwind" />
      <img src="../assets/Github/github.svg" alt="github" />
      <img src="../assets/Git/git.svg" alt="git" />
      <img src="../assets/Firestore/firestore.svg" alt="firestore" />
      <img src="../assets/Font/font.svg" alt="fontawesome" />
      <img src="../assets/Vercel/vercel.svg" alt="vercel" />
      <img src="../assets/Bootstrap/bootstrap.svg" alt="bootstrap" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  width: 800px;
  background-color: #2b343b;
  color: #f68c41;
  margin-bottom: 50px;
}

ol {
  list-style-type: square;
  padding-left: 20px;
}

img {
  width: 78px;
  height: 78px;
}

.imagesContainer {
  position: relative;
  padding-top: 25px;
  left: 50px;
}
</style>
