<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center justify-center text-dark-500 dark:text-white">
    <div class="relative w-32 h-36">
      <div class="absolute text-2xl top-0  left-1/2 transform translate-y-1/2 -translate-x-1/2">
        N
      </div>
      <div class="absolute text-2xl top-1/2 right-0 translate-x-1/2">
        O
      </div>
      <div class="absolute text-2xl bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2">
        S
      </div>
      <div class="absolute text-2xl top-1/2 left-0 -translate-x-1/2">
        W
      </div>
      <div class="absolute block border-2 border-dark-500 dark:border-white w-16 h-16 rounded-full mt-1/10 mx-auto mb-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="needle w-4 mt-8 mx-auto mb-0 animation-spin after:content-none after:-m-t-8 after:block after:border-solid before:content-none before:-m-b-10 before:block before:border-solid before:border-[#ccc transparent]" />
      </div>
    </div>
    <h2 class="mt-8 text-2xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
      {{ t('loading') }}
    </h2>
  </div>
</template>

<style scoped>
.needle {
    animation-name: wiggle;
    animation-duration: 2500ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}

.needle:after {
  border-color: rgb(37, 99, 235) transparent;
  border-width: 0px 8px 20px 8px;

}

.needle:before {
  border-color: rgb(74, 222, 128) transparent;
  border-width: 20px 8px 0px 8px;

}

@keyframes wiggle {
    0%   {transform:rotate(0deg);}
    10%  {transform:rotate(12deg);}
    40%  {transform:rotate(-25deg);}
    60%  {transform:rotate(20deg);}
    80%  {transform:rotate(-15deg);}
    100% {transform:rotate(0deg);}
}
</style>
