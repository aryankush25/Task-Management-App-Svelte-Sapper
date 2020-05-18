<script>
  import UserAvatar from "./UserAvatar";

  export let showProfile = false;
</script>

<style>
  header {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    text-align: center;
    background: #6dabe4;
    color: #fff;
    height: 4rem;
    display: flex;
    align-items: center;
    box-shadow: 2px 6px 6px;
    z-index: 10;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .header-heading-container {
    display: flex;
    flex: 1;
    text-align: left;
  }

  .header-heading-container h1 {
    margin: 0;
  }
  .header-heading-container a {
    text-decoration: none;
  }
</style>

<header>
  <div class="header-heading-container">
    <a href="/">
      <h1>Task Manager</h1>
    </a>
  </div>
  {#if showProfile}
    <UserAvatar />
  {/if}
</header>
