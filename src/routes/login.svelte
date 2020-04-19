<script>
  import LoginSignUpPageContainer from "../containers/LoginSignUpPageContainer";
  import SharedInput from "../components/shared/SharedInput";
  import SharedCheckbox from "../components/shared/SharedCheckbox";
  import SharedButton from "../components/shared/SharedButton";

  import { emailValidator, passwordValidator } from "../utils/validators.js";

  let rememberMe = false;
  let email = "";
  let password = "";

  $: validatorEmail = emailValidator(email);
  $: validatorPassword = passwordValidator(password);

  const onChangeEmail = event => {
    const { value } = event;
    email = value;
  };

  const onChangePassword = event => {
    const { value } = event;
    password = value;
  };

  const handleOnSubmit = () => {
    console.log("$$$$ email", email);
    console.log("$$$$ password", password);
    console.log("$$$$ rememberMe", rememberMe);
  };

  $: isValidFormData = validatorEmail.isValid && validatorPassword.isValid;
</script>

<style>
  .form-heading {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
  }
</style>

<svelte:head>
  <title>Task Management App - Login</title>
</svelte:head>

<LoginSignUpPageContainer reverse={false}>
  <img slot="image" src={'/images/signin-image.jpg'} alt="login-image" />

  <a slot="change-link" href="/register">Create an account</a>

  <form slot="main-form" on:submit|preventDefault>
    <div class="form-heading">Sign in</div>

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

    <SharedCheckbox
      name="rememberMe"
      bind:checked={rememberMe}
      label="Remember me" />

    <SharedButton
      label="Log in"
      name="login-button"
      disabled={!isValidFormData}
      onClick={handleOnSubmit} />
  </form>
</LoginSignUpPageContainer>
