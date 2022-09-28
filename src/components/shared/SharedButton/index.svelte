<script>
  export let name;
  export let label;
  export let isDisabled = false;
  export let isLoading = false;

  $: disabled = isDisabled || isLoading;
</script>

<style>
  .shared-button-container button {
    display: inline-block;
    background: #6dabe4;
    color: #fff;
    border-bottom: none;
    padding: 15px 39px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    font-size: 14px;
    width: 100%;
    position: relative;
  }

  .disabled {
    cursor: not-allowed !important;
    background: #6dabac !important;
  }

  .shared-button-container button i {
    position: absolute;
    right: 5px;
    top: 5px;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
</svelte:head>

<div class="shared-button-container">
  <button class:disabled {name} {disabled} on:click>
    {#if isLoading}
      <i class="fa fa-spinner fa-spin" />
    {/if}
    {label}
  </button>
</div>
