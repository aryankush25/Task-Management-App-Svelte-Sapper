<script>
  import { onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import userStore from "../stores/userStore.js";
  import AppContainer from "../containers/AppContainer";
  import Loader from "../components/shared/Loader";
  import { isPresent } from "../utils/helper.js";

  let isLoading = false;
  let name = "";
  let email = "";
  let age = "";
  let avatarUrl = "";
  let unsubscribe = null;

  onMount(() => {
    unsubscribe = userStore.subscribe(userData => {
      isLoading = userData.isLoading;
      name = userData.name;
      email = userData.email;
      age = userData.age;
      avatarUrl = userData.avatar;
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

  {#if isLoading}
    <svelte:component this={Loader} />
  {/if}

  <img src={avatarUrl} alt="user-image" />

  <div>Profile</div>
  <div>{name}</div>
  <div>{email}</div>
  <div>{age}</div>

</AppContainer>
