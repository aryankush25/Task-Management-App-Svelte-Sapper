<script>
  export let type
  export let name
  export let placeholder
  export let label
  export let value
  export let error
  export let onChange

  let localValue = ''

  const onChangeValue = event => {
    const { value, name } = event.target
    onChange({ value, name })
  }
</script>

<style>
  .shared-input-container {
    margin-bottom: 25px;
    min-width: 260px;
  }

  .shared-input-container label {
    font-size: 14px;
  }

  .shared-input-container input {
    border: none;
    width: 100%;
    border-bottom: 1px solid #999;
    padding: 6px;
    padding-left: 0px;
    font-family: Poppins;
    box-sizing: border-box;
    outline: none;
    font-size: 16px;
  }

  .input-error-border {
    border-bottom: 1px solid red !important;
  }

  .input-error-text {
    color: red;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  .shared-input-container .error {
    font-size: 12px;
    text-align: right;
  }
</style>

<div class="shared-input-container">
  {#if label}
    <label class:input-error-text={error}>{label}</label>
  {/if}

  <input
    class:input-error-border={error}
    {name}
    {type}
    {value}
    {placeholder}
    on:change={onChangeValue} />

  {#if error}
    <div class="error input-error-text">{error}</div>
  {/if}
</div>
