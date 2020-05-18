<script>
  import { onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import userStore from "../stores/userStore.js";
  import AppContainer from "../containers/AppContainer";
  import { isPresent } from "../utils/helper.js";

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

</style>

<svelte:head>
  <title>Task Management App - Profile</title>
</svelte:head>

<AppContainer>

  <div>Profile</div>

</AppContainer>
