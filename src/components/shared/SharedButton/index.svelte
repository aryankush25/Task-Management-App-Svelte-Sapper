<script>
  export let name
  export let label
  export let onClick
</script>

<style>
  .shared-button-container button {
    display: inline-block;
    background: #6dabe4;
    color: #fff;
    border-bottom: none;
    width: auto;
    padding: 15px 39px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
  }
</style>

<div class="shared-button-container">
  <button {name} on:click={onClick}>{label}</button>
</div>
