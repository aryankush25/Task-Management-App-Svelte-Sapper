<script>
  import LoginSignUpPageContainer from "../containers/LoginSignUpPageContainer";
  import SharedInput from "../components/shared/SharedInput";
  import SharedCheckbox from "../components/shared/SharedCheckbox";
  import SharedButton from "../components/shared/SharedButton";

  let checked = false;
  let email = "";
  let password = "";

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
    console.log("$$$$ checked", checked);
  };
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
  <img slot="image" src={'/images/signin-image.jpg'} alt="register-image" />

  <a slot="change-link" href="/signup">Create an account</a>

  <form slot="main-form" on:submit|preventDefault>
    <div class="form-heading">Sign in</div>

    <SharedInput
      type="text"
      name="email"
      label="Email"
      value={email}
      onChange={onChangeEmail}
      placeholder="Enter Email"
      error="Not a valid email" />

    <SharedInput
      type="password"
      name="password"
      label="Password"
      value={password}
      onChange={onChangePassword}
      placeholder="Enter Password"
      error="Must be greater than 8 characters" />

    <SharedCheckbox name="rememberMe" bind:checked label="Remember me" />

    <SharedButton label="Log in" name="login-button" onClick={handleOnSubmit} />
  </form>
</LoginSignUpPageContainer>
