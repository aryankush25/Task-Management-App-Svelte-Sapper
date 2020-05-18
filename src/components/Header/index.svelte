<script>
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import api from "../../services";
  import { isPresent } from "../../utils/helper.js";

  let imageUrl = "";

  const fetchInitialData = async () => {
    const response = await api.userApis.getMyAvatar();

    imageUrl = response.data;
  };

  onMount(() => {
    fetchInitialData();
  });
</script>

<style>
  header {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    text-align: center;
    background: #6dabe4;
    color: #fff;
    height: 4rem;
    display: flex;
    align-items: center;
    box-shadow: 2px 6px 6px;
    z-index: 10;
    padding: 0 30px;
    box-sizing: border-box;
  }

  header h1 {
    margin: 0;
  }

  .header-heading-container {
    flex: 1;
    text-align: left;
  }

  .header-avtart-container {
    height: 50px;
    width: 50px;
  }

  .header-avtart-container img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
</style>

<header>
  <div class="header-heading-container">
    <h1>Task Manager</h1>
  </div>
  {#if isPresent(imageUrl)}
    <div transition:scale class="header-avtart-container">
      <img src={imageUrl} alt="user-image" />
    </div>
  {/if}
</header>
