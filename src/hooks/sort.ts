import { computed, Ref } from 'vue';

type SortParam = 'asc' | 'desc' | null;

export default function useSortItems<T>(
  items: Ref<Array<T>>,
  sortProp: string,
  sorting: Ref<SortParam>
) {
  const sortedItems = computed(function() {
    if (!sorting.value) {
      console.log('sorting is null');
      return items.value as Array<T>;
    }
    const itemsList = items.value as Array<T>;

    return itemsList.sort((u1: T, u2: T) => {
      // @ts-ignore
      if (sorting.value === 'asc' && u1[sortProp] > u2[sortProp]) {
        return 1;
      } else if (sorting.value === 'asc') {
        return -1;
        //  @ts-ignore
      } else if (sorting.value === 'desc' && u1[sortProp] > u2[sortProp]) {
        return -1;
      } else {
        return 1;
      }
    });
  });

  return {
    sortedItems
  };
}
