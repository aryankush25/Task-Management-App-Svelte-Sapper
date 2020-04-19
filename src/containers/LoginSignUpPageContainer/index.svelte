<script>
  import SharedInput from '../../components/shared/SharedInput'
  import SharedCheckbox from '../../components/shared/SharedCheckbox'
  import SharedButton from '../../components/shared/SharedButton'

  let checked = false
  let email = ''
  let password = ''

  const onChangeEmail = event => {
    const { value } = event
    email = value
  }

  const onChangePassword = event => {
    const { value } = event
    password = value
  }

  const handleOnSubmit = () => {
    console.log('$$$$ email', email)
    console.log('$$$$ password', password)
    console.log('$$$$ checked', checked)
  }
</script>

<style>
  .page-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
  }

  .form-container {
    width: 80%;
    box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 75px 0;
    background: #fff;
    display: flex;
    max-width: 850px;
  }

  .image-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .form-wrapper {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-wrapper {
    margin-bottom: 50px;
  }

  .form-heading {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
  }
</style>

<div class="page-container">
  <div class="form-container">
    <div class="image-container">
      <div class="image-wrapper">
        <img src={'/images/signin-image.jpg'} alt="sign-in-image" />
      </div>
      <a href="/signup">Create an account</a>
    </div>

    <div class="form-wrapper">
      <form on:submit|preventDefault>
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
        <SharedButton
          label="Log in"
          name="login-button"
          onClick={handleOnSubmit} />
      </form>
    </div>
  </div>
</div>
