<script>
  export let checked
  export let name
  export let label
</script>

<style>
  .shared-checkbox-container {
    padding: 25px 0;
    display: flex;
    align-items: center;
  }

  .shared-checkbox-container input {
    height: 16px;
    width: 16px;
  }

  .shared-checkbox-container div {
    margin-left: 14px;
  }
</style>

<div class="shared-checkbox-container">
  <input type="checkbox" {name} bind:checked />
  <div>{label}</div>
</div>
