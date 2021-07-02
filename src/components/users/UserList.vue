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
import { ref, computed, toRefs, onBeforeUpdate } from 'vue';
import useSearch from '../../hooks/search';
import UserItem from './UserItem.vue';
import type { User } from '../../types';

export default defineComponent({
  components: {
    UserItem,
  },
  // props: {
  //   users: {
  //     type: Array as () => Array<User>
  //   }
  // },
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

    const sorting: Ref<string | null> = ref(null);
    const displayedUsers = computed(function () {
      if (!sorting.value) {
        return availableItems.value as Array<User>;
      }
      const itemsList = availableItems.value as Array<User>;

      return itemsList.sort((u1: User, u2: User) => {
        if (sorting.value === 'asc' && u1.fullName > u2.fullName) {
          return 1;
        } else if (sorting.value === 'asc') {
          return -1;
        } else if (sorting.value === 'desc' && u1.fullName > u2.fullName) {
          return -1;
        } else {
          return 1;
        }
      });
    });

    onBeforeUpdate(() => {
      console.log('selected user:', props.selectedUser);
    });

    function sort(mode: string) {
      if (sorting.value === mode) {
        // already selected, so toggle
        console.log('unselect');
        sorting.value = null;
      }
      else {
        sorting.value = mode;
      }
    }

    return {
      enteredSearchTerm,
      updateSearch,
      displayedUsers,
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