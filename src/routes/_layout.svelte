<script context="module">
  export async function preload(page) {
    return { page };
  }
</script>

<script>
  import * as R from "ramda";
  import { unProtectedRoutes } from "../utils/helper.js";
  import { isTokensPresentLocalStorage } from "../services/utils/helper.js";
  import { goto } from "@sapper/app";

  export let page;

  $: path = page.path;

  const fetchAuthGuard = async route => {
    const isLoggedIn = isTokensPresentLocalStorage();
    const isProtectedRouted = !R.includes(route, unProtectedRoutes);

    if (isLoggedIn && !isProtectedRouted) {
      await goto("/");
    } else if (!isLoggedIn && isProtectedRouted) {
      await goto("/login");
    }
  };

  $: fetchAuthGuard(path);
</script>

<style>
  main {
    font-family: monospace;
  }
</style>

<main>
  <slot />
</main>
