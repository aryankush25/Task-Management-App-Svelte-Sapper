<script>
  import { onMount, onDestroy } from "svelte";
  import { goto } from "@sapper/app";
  import { scale } from "svelte/transition";
  import userStore from "../stores/userStore.js";
  import AppContainer from "../containers/AppContainer";
  import Loader from "../components/shared/Loader";
  import SharedButton from "../components/shared/SharedButton";
  import api from "../services";
  import { isPresent, isNilOrEmpty } from "../utils/helper.js";

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

  const handleUserLogoutCurrentDevice = async () => {
    isLoading = true;
    const response = await api.userApis.logoutCurrentUser();
    isLoading = false;

    if (response.success) {
      await goto("/login");
    }
  };

  const handleUserLogoutAllDevices = async () => {
    isLoading = true;
    const response = await api.userApis.logoutAllUser();
    isLoading = false;

    if (response.success) {
      await goto("/login");
    }
  };

  const handleUserAccountDelete = async () => {
    isLoading = true;
    const response = await api.userApis.deleteMyAccount();
    isLoading = false;

    if (response.success) {
      await goto("/login");
    }
  };
</script>

<style>
  .user-profile-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
    background: #fff;
    box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 20px;
  }

  .user-image-container {
    max-width: 250px;
    max-height: 250px;
    min-width: 250px;
    min-height: 250px;
    margin: 20px 0;
  }

  .user-image-container img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  }

  .name-container {
    margin-top: 20px;
  }

  .age-container {
    margin-top: 10px;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 40px;
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
    <div class="user-image-container">
      {#if avatarUrl}
        <img transition:scale src={avatarUrl} alt="user-image" />
      {:else}
        <img
          transition:scale
          src={'/images/user-avatar.png'}
          alt="user-image" />
      {/if}
    </div>

    <div class="name-container">
      <h1>{name || 'User Name'}</h1>
    </div>
    <div class="email-container">
      <h3>{email || 'User Email'}</h3>
    </div>
    <div class="age-container">
      <h5>
        {#if isNilOrEmpty(age) || age === 0}
          Please specify your age using edit option
        {:else}{age} years old{/if}
      </h5>
    </div>

    <!-- <div class="buttons-container">
      <SharedButton
        name="deleteAccount"
        label="Delete My Account"
        on:click={handleUserAccountDelete} />
      <SharedButton
        name="editData"
        label="Edit My Info"
        on:click={() => console.log('Edit')} />
    </div> -->

    <div class="buttons-container">
      <SharedButton
        name="logoutAll"
        label="Logout from all devices"
        on:click={handleUserLogoutAllDevices} />
      <SharedButton
        name="logout"
        label="Logout from current device"
        on:click={handleUserLogoutCurrentDevice} />
    </div>

  </div>

</AppContainer>
