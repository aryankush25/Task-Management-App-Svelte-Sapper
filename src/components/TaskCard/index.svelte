<script>
  import moment from "moment";
  import SharedButton from "../shared/SharedButton";
  import SharedInput from "../shared/SharedInput";
  import SharedCheckbox from "../shared/SharedCheckbox";
  import { emptyValidator } from "../../utils/validators.js";

  import tasksStore from "../../stores/tasksStore.js";

  export let task;

  let description = task.description;
  let completed = task.completed;

  $: validDescription = emptyValidator(description);

  const onChangeDescription = ({ value }) => {
    description = value;
  };

  const getFormattedDate = date => {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss A");
  };

  const handleTaskDelete = () => {
    const currentTaskId = task._id;

    tasksStore.removeTask(currentTaskId);
  };

  const handleTaskUpdate = () => {
    const currentTaskId = task._id;

    tasksStore.updateTask(currentTaskId, { description, completed });
  };
</script>

<style>
  .task-container {
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

  <SharedInput
    type="description"
    name="description"
    label="Description"
    value={description}
    onChange={onChangeDescription}
    placeholder="Change Description"
    error={validDescription.errorMessage} />

  <SharedCheckbox
    name="completed"
    bind:checked={completed}
    label="Completed ?" />

  <SharedButton label="Delete" name="delete-task" on:click={handleTaskDelete} />
  <SharedButton label="Update" name="update-task" on:click={handleTaskUpdate} />

</div>
