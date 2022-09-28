<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import SharedButton from "../SharedButton";

  export let title;

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch("close");
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 30%;
    width: 40%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
  }

  .content {
    padding: 1rem;
  }

  h1 {
    padding: 1rem;
    margin: 0;
    border-bottom: 1px solid #ccc;
  }

  footer {
    padding: 1rem;
  }

  .close-button-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>

<div transition:fade class="modal-backdrop" on:click={closeModal} />
<div transition:fly={{ x: 0, y: 1000 }} class="modal">
  <h1>{title}</h1>
  <div class="content">
    <slot />
  </div>
  <footer>
    <div class="close-button-container">
      <slot name="footer">
        <SharedButton on:click={closeModal} label="Close" />
      </slot>
    </div>
  </footer>
</div>
