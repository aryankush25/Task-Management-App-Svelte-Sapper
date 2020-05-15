<script>
  import { onMount } from "svelte";
  import apis from "../services";
  import TaskCard from "../components/TaskCard";
  import SharedButton from "../components/shared/SharedButton";
  import AddTask from "../components/AddTask";

  let isLoading = false;
  let tasksArray = [];
  let isAddingTask = false;

  const fetchTasks = async () => {
    isLoading = true;
    const response = await apis.tasksApi.getTasks();
    tasksArray = response;

    isLoading = false;
  };

  onMount(() => {
    fetchTasks();
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
  <SharedButton on:click={toggelTaskAddModal} label="Add Task" />
  <div>
    <div class="tasks-container">
      {#each tasksArray as task}
        <TaskCard {task} />
      {/each}
    </div>
  </div>
{/if}
