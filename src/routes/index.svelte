<script>
  import { onMount, onDestroy } from "svelte";
  import tasksStore from "../stores/tasksStore.js";
  import TaskCard from "../components/TaskCard";
  import SharedButton from "../components/shared/SharedButton";
  import AddTask from "../components/AddTask";
  import { isNilOrEmpty } from "../utils/helper.js";

  let isLoading = false;
  let tasksArray = [];
  let isAddingTask = false;
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

  const toggelTaskAddModal = () => {
    isAddingTask = !isAddingTask;
  };
</script>

<style>
  .tasks-container {
    background-color: #4870ff;
    min-height: 100vh;
    color: white;
    padding: 60px;
  }
</style>

<svelte:head>
  <title>Task Management App</title>
</svelte:head>

{#if isAddingTask}
  <svelte:component this={AddTask} on:close={toggelTaskAddModal} />
{/if}

{#if isLoading}
  Loading...
{:else}
  <SharedButton
    name="add-tasks"
    on:click={toggelTaskAddModal}
    label="Add Task" />
  <div>
    <div class="tasks-container">
      {#each tasksArray as task}
        <TaskCard {task} />
      {/each}
    </div>
  </div>
{/if}
