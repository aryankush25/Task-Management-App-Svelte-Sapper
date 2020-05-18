<script>
  import { onMount, onDestroy } from "svelte";
  import { goto } from "@sapper/app";
  import { scale } from "svelte/transition";
  import userStore from "../stores/userStore.js";
  import AppContainer from "../containers/AppContainer";
  import Loader from "../components/shared/Loader";
  import SharedButton from "../components/shared/SharedButton";
  import api from "../services";

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

  const handleUserLogout = async () => {
    isLoading = true;
    const response = await api.userApis.logoutCurrentUser();
    isLoading = false;

    if (response.success) {
      await goto("/login");
    }
  };
</script>

<style>
  .user-profile-container {
  }
</style>

<svelte:head>
  <title>Task Management App - Profile</title>
</svelte:head>

<AppContainer>

  {#if isLoading}
    <svelte:component this={Loader} />
  {/if}

  <div class="user-profile-container">
    <img src={avatarUrl} alt="user-image" />

    <div>Name - {name}</div>
    <div>Email - {email}</div>
    <div>Age - {age}</div>

    <SharedButton name="logout" label="Logout" on:click={handleUserLogout} />
  </div>

</AppContainer>
