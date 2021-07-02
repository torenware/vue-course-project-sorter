import { ref, computed, watch } from 'vue';

export default function useSearch(items, searchProp) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(function () {
    if (activeSearchTerm.value) {
      return items.filter((item) =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    }
    return items;
  });

  watch(enteredSearchTerm, function (newValue) {
    setTimeout(() => {
      if (newValue === enteredSearchTerm.value) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  return {
    activeSearchTerm,
    enteredSearchTerm,
    availableItems,
    updateSearch
  };

}