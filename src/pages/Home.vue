<!-- Contains the HTML structure of the component -->
<template>
  <div>
    <h1>Home Page</h1>
    
    <!-- A Vue Router component that creates a link to the specified route(in this case /create)-->
    <router-link to="/create">Add Transaction</router-link>

    <!-- Custom component that lists transactions -->
    <TransactionList />
  </div>
</template>

<!-- contains JS logic of component -->
<script>

// Used to bring in other modules or components
import TransactionList from '@/pages/TransactionList.vue';

export default {
  // Registers the imported 'TransactionList' component to be used in this component
  components: {
    TransactionList,
  },
};
</script>

<!-- Contains CSS that is scoped to this component -->
 <!-- "scoped" attribute ensures that the styles only apply to this component -->
<style scoped>
/* Add any specific styles for this component */
</style>
