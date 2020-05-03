<script>
  import { goto } from "@sapper/app";

  import LoginSignUpPageContainer from "../containers/LoginSignUpPageContainer";
  import SharedInput from "../components/shared/SharedInput";
  import SharedCheckbox from "../components/shared/SharedCheckbox";
  import SharedButton from "../components/shared/SharedButton";
  import api from "../services";

  import {
    nameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator
  } from "../utils/validators.js";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let isLoading = false;

  $: validatorName = nameValidator(name);
  $: validatorEmail = emailValidator(email);
  $: validatorPassword = passwordValidator(password);
  $: validatorConfirmPassword = confirmPasswordValidator(
    password,
    confirmPassword
  );

  const onChangeName = event => {
    const { value } = event;
    name = value;
  };

  const onChangeEmail = event => {
    const { value } = event;
    email = value;
  };

  const onChangePassword = event => {
    const { value } = event;
    password = value;
  };

  const onChangeConfirmPassword = event => {
    const { value } = event;
    confirmPassword = value;
  };

  const handleOnSubmit = async () => {
    isLoading = true;
    const response = await api.userApis.registerUserApi(name, email, password);
    isLoading = false;

    if (response.success) {
      goto("/");
    }
  };

  $: isValidFormData =
    validatorName.isValid &&
    validatorEmail.isValid &&
    validatorPassword.isValid &&
    validatorConfirmPassword.isValid;
</script>

<style>
  .form-heading {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .register-button {
    padding-top: 20px;
  }
</style>

<svelte:head>
  <title>Task Management App - Register</title>
</svelte:head>

<LoginSignUpPageContainer reverse={true}>
  <img slot="image" src={'/images/signup-image.jpg'} alt="register-image" />

  <a slot="change-link" href="/login">I am already member</a>

  <form slot="main-form" on:submit|preventDefault>
    <div class="form-heading">Sign up</div>

    <SharedInput
      type="text"
      name="name"
      label="Name"
      value={name}
      onChange={onChangeName}
      placeholder="Your Name"
      error={validatorName.errorMessage} />

    <SharedInput
      type="text"
      name="email"
      label="Email"
      value={email}
      onChange={onChangeEmail}
      placeholder="Enter Email"
      error={validatorEmail.errorMessage} />

    <SharedInput
      type="password"
      name="password"
      label="Password"
      value={password}
      onChange={onChangePassword}
      placeholder="Enter Password"
      error={validatorPassword.errorMessage} />

    <SharedInput
      type="password"
      name="confirmPassword"
      label="Confirm Password"
      value={confirmPassword}
      onChange={onChangeConfirmPassword}
      placeholder="Confirm Password"
      error={validatorConfirmPassword.errorMessage} />

    <div class="register-button">
      <SharedButton
        label="Register"
        name="login-button"
        isDisabled={!isValidFormData}
        {isLoading}
        onClick={handleOnSubmit} />
    </div>
  </form>
</LoginSignUpPageContainer>
