<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search v-if="hasProjects" @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <ul v-if="hasProjects">
      <project-item v-for="prj in availableProjects" :key="prj.id" :title="prj.title"></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { computed, watch, toRefs } from 'vue';
import useSearch from '../../hooks/search';
import type {User, Project} from '../../types';

import ProjectItem from './ProjectItem.vue';

export default defineComponent({
  components: {
    ProjectItem,
  },
  props: {
    user: {
      type: Object as () => User
    }
  },
  setup(props) {
    
    const { user } = toRefs(props);

    const projects = computed((): Project[] => {
      return user.value.projects;
    });

    const {
      enteredSearchTerm,
      availableItems,
      updateSearch
    } = useSearch(projects, 'title');


    const hasProjects = computed(function () {
      return props.user.projects && availableItems.value.length > 0;
    });

    watch(user, function () {
      enteredSearchTerm.value = '';
    });

    return {
      enteredSearchTerm,
      availableProjects: availableItems,
      hasProjects,
      updateSearch,
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