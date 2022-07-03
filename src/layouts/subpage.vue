<template>
  <header class="bg-dark-400 px-4 py-2">
    <router-link to="/">
      <Logo class="text-xl" image-size="h-6" />
    </router-link>
  </header>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200" v-bind="$attrs">
    <RouterView />
    <Footer />
  </main>
</template>
