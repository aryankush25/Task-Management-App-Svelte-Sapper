<script>
  import { createEventDispatcher } from "svelte";
  import Modal from "../shared/Modal";
  import SharedInput from "../shared/SharedInput";
  import SharedCheckbox from "../shared/SharedCheckbox";
  import SharedButton from "../shared/SharedButton";
  import { emptyValidator } from "../../utils/validators.js";
  import tasksStore from "../../stores/tasksStore.js";

  const dispatch = createEventDispatcher();

  let description = "";
  let isCompleted = false;

  $: validDescription = emptyValidator(description);

  const onChangeDescription = ({ value }) => {
    description = value;
  };

  const closeModal = () => dispatch("close");

  const submit = () => {
    tasksStore.addTask(description, isCompleted);
    closeModal()
  };
</script>

<style>
  .save-task-buttons {
    display: flex;
  }

  .save-task-button {
    margin: 0 5px;
  }
</style>

<Modal title="Add Tasks" on:close>
  <div>
    <SharedInput
      type="description"
      name="description"
      label="Description"
      value={description}
      onChange={onChangeDescription}
      placeholder="Enter Description"
      error={validDescription.errorMessage} />

    <SharedCheckbox
      name="completed"
      bind:checked={isCompleted}
      label="Completed ?" />
  </div>
  <div slot="footer">
    <div class="save-task-buttons">
      <div class="save-task-button">
        <SharedButton on:click={closeModal} label="Close" />
      </div>
      <div class="save-task-button">
        <SharedButton on:click={submit} label="Submit" />
      </div>
    </div>
  </div>
</Modal>
