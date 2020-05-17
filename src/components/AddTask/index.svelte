<script>
  import { fly } from "svelte/transition";
  import SharedButton from "../shared/SharedButton";
  import TaskCardContainer from "../../containers/TaskCardContainer";
  import { emptyValidator } from "../../utils/validators.js";
  import tasksStore from "../../stores/tasksStore.js";

  let description = "";
  let isCompleted = false;

  $: validDescription = emptyValidator(description);
  $: isSaveButtonDisabled = !validDescription.isValid;

  const onChangeDescription = ({ value }) => {
    description = value;
  };

  const submit = () => {
    tasksStore.addTask(description, isCompleted);
    description = "";
    isCompleted = false;
  };

  const handleCompletedValueChange = () => {
    isCompleted = !isCompleted;
  };
</script>

<style>
  .card-heading {
    font-size: 28px;
    font-weight: bold;
  }
</style>

<TaskCardContainer
  checkBoxId="add-task-checkbox"
  isChecked={isCompleted}
  bind:description
  handleCheckboxValueChange={handleCompletedValueChange}>

  <div slot="header" class="card-heading">Add Task</div>

  <SharedButton
    label="Save"
    name="save-description"
    isDisabled={isSaveButtonDisabled}
    on:click={submit} />

</TaskCardContainer>
