<script>
  import { onMount, onDestroy } from "svelte";
  import AppContainer from "../containers/AppContainer";
  import Loader from "../components/shared/Loader";
  import Tasks from "../components/Tasks";
  import tasksStore from "../stores/tasksStore.js";

  let isLoading = false;
  let tasksArray = [];
  let unsubscribe;

  onMount(() => {
    unsubscribe = tasksStore.subscribe(tasksStoreObject => {
      tasksArray = tasksStoreObject.tasksArray;
      isLoading = tasksStoreObject.isLoading;
    });

    tasksStore.setInitialValue();
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<svelte:head>
  <title>Task Management App</title>
</svelte:head>

<AppContainer>

  {#if isLoading}
    <svelte:component this={Loader} />
  {/if}

  <Tasks {tasksArray} />

</AppContainer>
