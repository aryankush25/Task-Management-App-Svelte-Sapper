<script>
  import { fly } from "svelte/transition";
  import moment from "moment";
  import SharedButton from "../shared/SharedButton";
  import CheckboxRound from "../shared/CheckboxRound";
  import TaskCardContainer from "../../containers/TaskCardContainer";
  import { emptyValidator } from "../../utils/validators.js";

  import tasksStore from "../../stores/tasksStore.js";

  export let task;

  let description = task.description;
  let completed = task.completed;

  $: validDescription = emptyValidator(description);

  $: isSaveButtonDisabled =
    !validDescription.isValid || task.description === description;

  const onChangeDescription = ({ value }) => {
    description = value;
  };

  const getFormattedDate = date => {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm A");
  };

  const handleTaskDelete = () => {
    tasksStore.removeTask(task._id);
  };

  const handleTaskUpdateDescription = () => {
    tasksStore.updateTask(task._id, { description });
  };

  const handleCompletedValueChange = () => {
    completed = !completed;

    tasksStore.updateTask(task._id, { completed });
  };
</script>

<style>
  .task-time-status {
    font-size: 10px;
    color: gray;
  }

  .task-time-status-container span {
    color: black;
  }

  .save-button-container {
    margin-right: 10px;
  }
</style>

<TaskCardContainer
  checkBoxId={task._id}
  isChecked={completed}
  bind:description
  handleCheckboxValueChange={handleCompletedValueChange}>

  <div slot="header" class="task-time-status">
    <div class="task-time-status-container">
      <span>Created At:</span>
      {getFormattedDate(task.createdAt)}
    </div>
    <div class="task-time-status-container">
      <span>Last Updated At:</span>
      {getFormattedDate(task.updatedAt)}
    </div>
  </div>

  {#if !isSaveButtonDisabled}
    <div transition:fly={{ x: -100 }} class="save-button-container">
      <SharedButton
        label="Save"
        name="save-description"
        isDisabled={isSaveButtonDisabled}
        on:click={handleTaskUpdateDescription} />
    </div>
  {/if}

  <SharedButton label="Delete" name="delete-task" on:click={handleTaskDelete} />

</TaskCardContainer>
