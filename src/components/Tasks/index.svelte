<script>
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  import TaskCard from "../TaskCard";

  export let tasksArray;
</script>

<style>
  .tasks-container {
    color: white;
    padding: 60px;
    display: flex;
    flex-wrap: wrap;
  }
</style>

<div class="tasks-container">
  {#each tasksArray as task (task._id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <TaskCard {task} />
    </div>
  {/each}
</div>
