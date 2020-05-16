<script>
  import { fly } from "svelte/transition";
  import moment from "moment";
  import SharedButton from "../shared/SharedButton";
  import SharedInput from "../shared/SharedInput";
  import SharedCheckbox from "../shared/SharedCheckbox";
  import CheckboxRound from "../shared/CheckboxRound";
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
  .task-container {
    background: #fff;
    box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 10px;
    margin: 20px;
    color: black;
  }

  .card-header {
    display: flex;
  }

  .task-time-status {
    font-size: 10px;
    color: gray;
  }

  .task-time-status-container span {
    color: black;
  }

  .completed-container {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    margin: 0 20px;
    flex: 1;
  }

  .description-textarea {
    width: 100%;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    border: solid 1px grey;
    resize: none;
  }

  .task-actions-buttons {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .save-button-container {
    margin-right: 10px;
  }
</style>

<div class="task-container">
  <div class="card-header">
    <div class="task-time-status">
      <div class="task-time-status-container">
        <span>Created At:</span>
        {getFormattedDate(task.createdAt)}
      </div>
      <div class="task-time-status-container">
        <span>Last Updated At:</span>
        {getFormattedDate(task.updatedAt)}
      </div>
    </div>

    <div class="completed-container">
      <CheckboxRound
        checked={completed}
        id={task._id}
        on:click={handleCompletedValueChange} />
    </div>
  </div>

  <div>Task Description</div>

  <textarea rows="4" class="description-textarea" bind:value={description} />

  <div class="task-actions-buttons">
    {#if !isSaveButtonDisabled}
      <div transition:fly={{ x: 100 }} class="save-button-container">
        <SharedButton
          label="Save"
          name="save-description"
          isDisabled={isSaveButtonDisabled}
          on:click={handleTaskUpdateDescription} />
      </div>
    {/if}

    <SharedButton
      label="Delete"
      name="delete-task"
      on:click={handleTaskDelete} />
  </div>

</div>
