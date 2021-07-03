import { ref, computed, watch, Ref } from 'vue';

export default function useSearch<T>(
  items: Ref<Array<T>>,
  searchProp: keyof T
) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(
    (): Array<T> => {
      if (activeSearchTerm.value) {
        const ucTerm = activeSearchTerm.value.toUpperCase();
        return items.value.filter((item: T) => {
          // @ts-ignore
          const text = item[searchProp].toUpperCase();
          return text.includes(ucTerm);
        });
      }
      return items.value;
    }
  );

  watch(enteredSearchTerm, function(newValue) {
    setTimeout(() => {
      if (newValue === enteredSearchTerm.value) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  function updateSearch(val: string) {
    enteredSearchTerm.value = val;
  }

  return {
    activeSearchTerm,
    enteredSearchTerm,
    availableItems,
    updateSearch
  };
}
