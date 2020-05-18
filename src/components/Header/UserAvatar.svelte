<script>
  import { scale } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { isPresent } from "../../utils/helper.js";
  import userStore from "../../stores/userStore.js";

  let avatarUrl = "";
  let unsubscribe = null;

  onMount(() => {
    unsubscribe = userStore.subscribe(userData => {
      const { avatar } = userData;

      avatarUrl = avatar;
    });

    if (!userStore.isUserDataPresent()) {
      userStore.fetchAvatar();
      userStore.fetchUserData();
    }
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<style>
  .header-avtart-container {
    height: 50px;
    width: 50px;
    cursor: pointer;
  }

  .header-avtart-container img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
</style>

<a href="/profile">
  <div transition:scale class="header-avtart-container">
    {#if isPresent(avatarUrl)}
      <img src={avatarUrl} alt="user-image" />
    {:else}
      <img src={'/images/user-avatar.png'} alt="user-image" />
    {/if}
  </div>
</a>
