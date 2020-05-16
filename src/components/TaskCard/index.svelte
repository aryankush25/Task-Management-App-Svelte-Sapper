<script>
  import moment from "moment";
  import SharedButton from "../shared/SharedButton";
  import tasksStore from '../../stores/tasksStore.js'

  export let task;

  const getFormattedDate = date => {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss A");
  };

  const handleTaskDelete = () => {
    const currentTaskId = task._id;

    tasksStore.removeTask(currentTaskId)
  };
</script>

<style>
  .task-container {
    height: 200px;
    width: 500px;
    background-color: #4870ff;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin: 10px 0;
  }
</style>

<div class="task-container">
  <div>Description - {task.description}</div>
  <div>Completed - {task.completed}</div>
  <div>Created At - {getFormattedDate(task.createdAt)}</div>
  <div>Updated At - {getFormattedDate(task.updatedAt)}</div>

  <SharedButton
    label="Delete"
    name="delete-task"
    on:click={handleTaskDelete} />

</div>
