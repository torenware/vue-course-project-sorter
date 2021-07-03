<template>
  <base-container>
    <h2>Active Users</h2>
    <base-search @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <div>
      <button @click="sort('asc')" :class="{selected: sorting === 'asc'}">Sort Ascending</button>
      <button @click="sort('desc')" :class="{selected: sorting === 'desc'}">Sort Descending</button>
    </div>
    <ul>
      <user-item
        v-for="user in displayedUsers"
        :key="user.id"
        :user-name="user.fullName"
        :id="user.id"
        :is-selected="selectedUser && (selectedUser.id === user.id)"
        @list-projects="$emit('list-projects', $event)"
      ></user-item>
    </ul>
  </base-container>
</template>


<script lang="ts">
import { defineComponent, Ref } from 'vue'
import { ref, toRefs } from 'vue';
import useSearch from '../../hooks/search';
import useSortItems from '../../hooks/sort';
import UserItem from './UserItem.vue';
import type { User } from '../../types';

type SortParam  = ('asc' | 'desc' | null);

export default defineComponent({
  components: {
    UserItem,
  },

  props: ['users', 'selectedUser'],
  emits: ['list-projects'],
  setup(props) {
    
    // Convert users to a ref so we can share this
    // code with ProjectsList:
    const { users  } = toRefs(props);
    const userList = users as Ref<Array<User>>; 
    const {
      enteredSearchTerm,
      availableItems,
      updateSearch
    } = useSearch(userList, 'fullName');

    const sorting: Ref<SortParam> = ref(null);
    const sortProp: keyof User = 'fullName';

    const { sortedItems } = useSortItems(availableItems as Ref<User[]>, sortProp, sorting);

    function sort(mode: SortParam) {
      if (sorting.value === mode) {
        // already selected, so toggle
        sorting.value = null;
      }
      else {
        sorting.value = mode;
      }
    }

    return {
      enteredSearchTerm,
      updateSearch,
      displayedUsers: sortedItems,
      sorting,
      sort
    };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
