<script>
  import { onMount, onDestroy } from "svelte";
  import { goto } from "@sapper/app";
  import { scale } from "svelte/transition";
  import userStore from "../stores/userStore.js";
  import AppContainer from "../containers/AppContainer";
  import Loader from "../components/shared/Loader";
  import SharedButton from "../components/shared/SharedButton";
  import SharedInput from "../components/shared/SharedInput";
  import api from "../services";
  import { isPresent, isNilOrEmpty } from "../utils/helper.js";
  import { nameValidator, ageValidator } from "../utils/validators.js";

  let isEditingModeOn = false;
  let isLoading = false;
  let name = "";
  let email = "";
  let age = "";
  let avatarUrl = null;
  let unsubscribe = null;

  $: newUserName = name;
  $: newUserAge = age;
  $: newUserAvatar = avatarUrl;

  $: console.log("$$$$ avatarUrl", avatarUrl);
  $: console.log("$$$$ newUserAvatar", newUserAvatar);

  $: newUserNameValidator = nameValidator(newUserName || "");
  $: newUserAgeValidator = ageValidator(newUserAge || 0);

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

  const handleUserAvatarActionClick = () => {
    if (isPresent(newUserAvatar)) {
      newUserAvatar = "";
    } else {
      const inputButtonRef = document.getElementById("user-avatar-input");
      inputButtonRef.click();
    }
  };

  const handelImageDataLoad = event => {
    const file = event.target.files[0] || {};

    newUserAvatar = file;
  };

  const handleSaveUserInfo = () => {
    userStore.updateUserData(newUserName, newUserAge);

    if (!(isNilOrEmpty(newUserAvatar) && isNilOrEmpty(avatarUrl))) {
      if (isNilOrEmpty(newUserAvatar)) {
        userStore.deleteAvatar();
      } else {
        userStore.updateAvatar(newUserAvatar);
      }
    }

    isEditingModeOn = !isEditingModeOn;
  };

  const handleNameChange = ({ value }) => (newUserName = value);

  const handleAgeChange = ({ value }) => (newUserAge = value);

  $: newUserAgeUrl = (newUserAvatar && newUserAvatar instanceof File) ? URL.createObjectURL(newUserAvatar) : newUserAvatar

  $: isSaveButtonDisabled =
    (newUserName === name &&
      newUserAge === age &&
      newUserAvatar === avatarUrl) ||
    (!newUserNameValidator.isValid || !newUserAgeValidator.isValid);
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
    position: relative;
  }

  .user-avatar {
    width: 100%;
    height: 100%;
    max-width: 250px;
    max-height: 250px;
    border-radius: 10px;
    box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  }

  .user-avatar-action-container {
    position: absolute;
    height: 25px;
    width: 25px;
    background: #fe2851;
    top: -10px;
    right: -10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .user-avatar-action {
    height: 16px;
    width: 16px;
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

  .profile-screen-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .edit-button-container {
    height: 30px;
    width: 30px;
    background: #fe2851;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .edit-button {
    height: 20px;
    width: 20px;
  }

  .actions-buttons-container {
    justify-content: flex-end;
  }

  .margin-left-20 {
    margin-left: 20px;
  }

  #user-avatar-input {
    display: none;
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
    {#if !isEditingModeOn}
      <div class="profile-screen-header">
        <div
          class="edit-button-container"
          on:click={() => (isEditingModeOn = !isEditingModeOn)}>
          <img
            class="edit-button"
            src="/images/edit-pencil.png"
            alt="edit-button" />
        </div>
      </div>
    {/if}

    <div class="user-image-container">
      {#if isEditingModeOn}
        <div
          class="user-avatar-action-container"
          on:click={handleUserAvatarActionClick}>
          <input
            id="user-avatar-input"
            type="file"
            accept={['image/png', 'image/jpeg']}
            on:change={handelImageDataLoad} />
          <img
            class="user-avatar-action"
            src={newUserAvatar ? '/images/trash-white.png' : '/images/upload-white.png'}
            alt="user-avatar-action" />
        </div>
      {/if}

      <img
        class="user-avatar"
        transition:scale
        src={(isEditingModeOn ? newUserAgeUrl : avatarUrl) || '/images/user-avatar.png'}
        alt="user-image" />
    </div>

    <div class="name-container">
      {#if isEditingModeOn}
        <SharedInput
          type="text"
          name="userName"
          placeholder="Enter Name"
          label="Name"
          value={newUserName}
          error={newUserNameValidator.errorMessage}
          onChange={handleNameChange} />
      {:else}
        <h1>{name || 'User Name'}</h1>
      {/if}
    </div>
    {#if !isEditingModeOn}
      <div class="email-container">
        <h3>{email || 'User Email'}</h3>
      </div>
    {/if}

    <div class="age-container">

      {#if isEditingModeOn}
        <SharedInput
          type="number"
          name="userAge"
          placeholder="Enter Age"
          label="Age"
          value={newUserAge}
          error={newUserAgeValidator.errorMessage}
          onChange={handleAgeChange} />
      {:else}
        <h5>
          {#if isNilOrEmpty(age) || age === 0}
            Please specify your age using edit option
          {:else}{age} years old{/if}
        </h5>
      {/if}

    </div>

    {#if !isEditingModeOn}
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
    {:else}
      <div class="buttons-container actions-buttons-container">
        <SharedButton
          name="cancel"
          label="Cancel"
          on:click={() => (isEditingModeOn = !isEditingModeOn)} />
        <div class="margin-left-20">
          <SharedButton
            name="save"
            label="Save"
            isDisabled={isSaveButtonDisabled}
            on:click={handleSaveUserInfo} />
        </div>
      </div>
    {/if}
  </div>
</AppContainer>
