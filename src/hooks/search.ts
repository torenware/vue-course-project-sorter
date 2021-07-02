import { ref, computed, watch, Ref } from 'vue';

export default function useSearch<T extends Object>(
  items: Ref<Array<T>>,
  searchProp: string
) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(
    (): Array<T> => {
      if (activeSearchTerm.value) {
        return items.value.filter((item: T) => {
          // @ts-ignore
          const text = item[searchProp];
          text.includes(activeSearchTerm.value);
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
