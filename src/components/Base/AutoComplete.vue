<script setup lang="ts">
import { defineEmits } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface IAutoCompleteItem {
  id: string
  [itemText: string]: string
}

const props = defineProps<{
  modelValue: unknown
  autoCompleteData: IAutoCompleteItem[]
  itemText: string
}>()

const emit = defineEmits<{
  (e: 'itemSelected', item: IAutoCompleteItem | undefined): void
}>()

const { autoCompleteData, itemText } = toRefs(props)

const autoCompleteInput = ref<HTMLInputElement>()
const inputValue = ref('')
const showSuggestions = ref(false)

onClickOutside(autoCompleteInput, () => showSuggestions.value = false)

const suggestions = computed(() => {
  return autoCompleteData.value.filter((item: any) => !inputValue.value || item[itemText.value].toLowerCase().startsWith(inputValue.value.toLowerCase()))
})

const selectItem = (item: IAutoCompleteItem) => {
  inputValue.value = item[itemText.value]
  showSuggestions.value = false
  emit('itemSelected', item)
}

const clearInputValue = () => {
  inputValue.value = ''
  emit('itemSelected', undefined)
}

watchEffect(() => {
  const foundItem = autoCompleteData.value.filter((item: any) => item[itemText.value].toLowerCase() === inputValue.value.toLowerCase())

  if (foundItem.length === 1)
    selectItem(foundItem[0])
})
</script>

<template>
  <div class="hover:cursor-pointer relative text-gray-900 dark:text-white w-96">
    <input ref="autoCompleteInput" v-model="inputValue" type="text" class="w-full bg-white dark:bg-dark-500 px-4 py-2 focus:outline-none border-x border-t border-gray-400" :class="[showSuggestions && suggestions.length ? 'rounded-t-lg' : 'rounded-lg border-b']" @focus="showSuggestions = true">
    <div v-if="inputValue" class="absolute top-3 right-3 hover:cursor-pointer" i="carbon-trash-can" @click="clearInputValue" />
    <ul v-if="showSuggestions && suggestions.length" class="decoration-none text-left">
      <li v-for="(suggestion, index) in suggestions" :key="suggestion.id" class="border-x border-t border-gray-400 px-4 py-2 w-full bg-white dark:bg-dark-500 dark:hover:bg-dark-300 hover:cursor-pointer hover:bg-teal-100" :class="[suggestions.length - 1 === index && 'rounded-b-lg border-b']" @click.stop.prevent="selectItem(suggestion)">
        <slot name="auto-complete-item" :item="suggestion" />
      </li>
    </ul>
  </div>
</template>
