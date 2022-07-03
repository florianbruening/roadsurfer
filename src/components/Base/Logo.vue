<script setup lang="ts">
withDefaults(defineProps<{
  imageSize: string
}>(), {
  imageSize: 'h-20',
})
</script>

<template>
  <div class="flex items-center">
    <h1 class="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
      streetsurfer
    </h1>
    <img src="/wave.png" alt="wave" :class="imageSize">
  </div>
</template>
