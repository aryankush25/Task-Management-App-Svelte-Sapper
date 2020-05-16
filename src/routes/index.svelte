<script>
  import { onMount, onDestroy } from "svelte";

  import TodoListContainer from "../containers/TodoListContainer";
  import Loader from "../components/shared/Loader";
  import SharedButton from "../components/shared/SharedButton";
  import AddTask from "../components/AddTask";
  import Tasks from "../components/Tasks";

  import tasksStore from "../stores/tasksStore.js";

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

<svelte:head>
  <title>Task Management App</title>
</svelte:head>

<TodoListContainer>
  {#if isAddingTask}
    <svelte:component this={AddTask} on:close={toggelTaskAddModal} />
  {/if}

  {#if isLoading}
    <Loader />
  {/if}

  <SharedButton
    name="add-tasks"
    on:click={toggelTaskAddModal}
    label="Add Task" />

  <Tasks {tasksArray} />

</TodoListContainer>
