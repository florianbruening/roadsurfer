<script setup lang="ts">
import { computed, defineEmits } from 'vue'
import { onClickOutside, useMagicKeys } from '@vueuse/core'

interface IAutoCompleteItem {
  id: string
  [itemText: string]: string
}

const props = defineProps<{
  value: IAutoCompleteItem | undefined | null
  autoCompleteData: IAutoCompleteItem[]
  itemText: string
}>()

const emit = defineEmits<{
  (e: 'itemSelected', item: IAutoCompleteItem | null): VoidFunction
}>()

const { autoCompleteData, itemText, value } = toRefs(props)

const highlightedEntryIndex = ref(0)
const listEntries = ref<HTMLUListElement[]>()
const autoCompleteInput = ref<HTMLInputElement>()
const inputValue = ref('')
const showSuggestions = ref(false)

const { ArrowUp, ArrowDown, Enter } = useMagicKeys()

onClickOutside(autoCompleteInput, () => {
  showSuggestions.value = false

  const foundItem = autoCompleteData.value.filter((item: any) => item[itemText.value].toLowerCase() === inputValue.value.toLowerCase())

  if (foundItem.length === 0 && value.value)
    inputValue.value = value.value[itemText.value]
})

const suggestions = computed(() => {
  return autoCompleteData.value.filter((item: any) => !inputValue.value || item[itemText.value].toLowerCase().startsWith(inputValue.value.toLowerCase()))
})

const selectItem = (item: IAutoCompleteItem) => {
  highlightedEntryIndex.value = 0
  inputValue.value = item[itemText.value]
  showSuggestions.value = false
  emit('itemSelected', item)
}

const clearInputValue = () => {
  inputValue.value = ''
  emit('itemSelected', null)
}

watch(ArrowUp, (v) => {
  if (v && showSuggestions.value) {
    if (highlightedEntryIndex.value > 0)
      highlightedEntryIndex.value--
  }
})

watch(ArrowDown, (v) => {
  if (v && showSuggestions.value && listEntries.value) {
    if (highlightedEntryIndex.value < listEntries.value?.length - 1)
      highlightedEntryIndex.value++
  }
})

watch(Enter, (v) => {
  if (v && showSuggestions.value && listEntries.value && suggestions.value[highlightedEntryIndex.value])
    selectItem(suggestions.value[highlightedEntryIndex.value])
})

watchEffect(() => {
  if (value.value)
    inputValue.value = value.value[itemText.value]
})

watchEffect(() => {
  const foundItem = autoCompleteData.value.filter((item: any) => item[itemText.value].toLowerCase() === inputValue.value.toLowerCase())
  if (value.value)
    showSuggestions.value = true

  if (foundItem.length === 1)
    selectItem(foundItem[0])
})
</script>

<template>
  <div class="hover:cursor-pointer relative text-gray-900 dark:text-white w-86">
    <input ref="autoCompleteInput" v-model="inputValue" type="text" class="w-full bg-white dark:bg-dark-500 px-4 py-2 focus:outline-none border-x border-t border-gray-400" :class="[showSuggestions && suggestions.length ? 'rounded-t-lg' : 'rounded-lg border-b']" @focus="showSuggestions = true">
    <div v-if="inputValue" class="absolute top-3 right-3 hover:cursor-pointer" i="carbon-trash-can" @click="clearInputValue" />
    <ul v-if="showSuggestions && suggestions.length" class="decoration-none text-left">
      <li v-for="(suggestion, index) in suggestions" ref="listEntries" :key="suggestion.id" class="border-x border-t border-gray-400 px-4 py-2 w-full  dark:hover:bg-dark-300 hover:cursor-pointer hover:bg-teal-100" :class="[suggestions.length - 1 === index && 'rounded-b-lg border-b', highlightedEntryIndex === index ? 'dark:bg-dark-300 bg-teal-100' : 'bg-white dark:bg-dark-500']" @click.stop.prevent="selectItem(suggestion)">
        <slot name="auto-complete-item" :item="suggestion" />
      </li>
    </ul>
  </div>
</template>
