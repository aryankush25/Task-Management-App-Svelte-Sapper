<script>
  import LoginSignUpPageContainer from "../containers/LoginSignUpPageContainer";
  import SharedInput from "../components/shared/SharedInput";
  import SharedCheckbox from "../components/shared/SharedCheckbox";
  import SharedButton from "../components/shared/SharedButton";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";

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

  const handleOnSubmit = () => {
    console.log("$$$$ name", name);
    console.log("$$$$ email", email);
    console.log("$$$$ password", password);
    console.log("$$$$ confirmPassword", confirmPassword);
  };
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
  <title>Task Management App - Login</title>
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
      error="" />

    <SharedInput
      type="text"
      name="email"
      label="Email"
      value={email}
      onChange={onChangeEmail}
      placeholder="Enter Email"
      error="" />

    <SharedInput
      type="password"
      name="password"
      label="Password"
      value={password}
      onChange={onChangePassword}
      placeholder="Enter Password"
      error="" />

    <SharedInput
      type="password"
      name="confirmPassword"
      label="Confirm Password"
      value={confirmPassword}
      onChange={onChangeConfirmPassword}
      placeholder="Confirm Password"
      error="" />

    <div class="register-button">
      <SharedButton
        label="Register"
        name="login-button"
        onClick={handleOnSubmit} />
    </div>
  </form>
</LoginSignUpPageContainer>
