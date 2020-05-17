<script>
  import SharedButton from "../../components/shared/SharedButton";
  import CheckboxRound from "../../components/shared/CheckboxRound";

  export let checkBoxId;
  export let isChecked;
  export let handleCheckboxValueChange;
  export let description;
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
</style>

<div class="task-container">
  <div class="card-header">

    <slot name="header" />

    <div class="completed-container">
      <CheckboxRound
        checked={isChecked}
        id={checkBoxId}
        on:click={handleCheckboxValueChange} />
    </div>
  </div>

  <div>Task Description</div>

  <textarea rows="4" class="description-textarea" bind:value={description} />

  <div class="task-actions-buttons">
    <slot />
  </div>
</div>
