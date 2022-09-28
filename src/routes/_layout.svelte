<script>
  import * as R from "ramda";
  import { unProtectedRoutes } from "../utils/helper.js";
  import { isTokensPresentLocalStorage } from "../services/utils/helper.js";
  import { goto } from "@sapper/app";
  import api from "../services";
  import Header from "../components/Header";

  export let segment;

  $: path = segment ? `/${segment}` : "/";

  const fetchAuthGuard = async route => {
    try {
      const isLoggedIn = isTokensPresentLocalStorage();
      const isProtectedRouted = !R.includes(route, unProtectedRoutes);

      if (isLoggedIn && !isProtectedRouted) {
        if (window) await goto("/");
      } else if (!isLoggedIn && isProtectedRouted) {
        if (window) await goto("/login");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  $: fetchAuthGuard(path);

  $: showHeader = !R.includes(path, unProtectedRoutes);
</script>

<style>
  main {
    font-family: monospace;
  }

  .height-top {
    margin-top: 4rem;
    height: calc(100vh - 4rem);
  }
</style>

{#if showHeader}
  <Header showProfile={path !== '/profile'} />
{/if}

<main class:height-top={showHeader}>
  <slot />
</main>
