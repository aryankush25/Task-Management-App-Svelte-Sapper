<script>
  export let reverse;
</script>

<style>
  .page-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
  }

  .form-container {
    width: 80%;
    box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 75px 0;
    background: #fff;
    display: flex;
    max-width: 850px;
  }

  .image-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .form-wrapper {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-wrapper {
    margin-bottom: 50px;
  }

  .reverse {
    flex-direction: row-reverse;
  }
</style>

<div class="page-container">
  <div class="form-container" class:reverse>
    <div class="image-container">
      <div class="image-wrapper">
        <slot name="image" />
      </div>

      <slot name="change-link" />
    </div>

    <div class="form-wrapper">
      <slot name="main-form" />
    </div>
  </div>
  <slot />
</div>
