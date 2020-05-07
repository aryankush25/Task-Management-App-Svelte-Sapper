<script>
  import * as R from "ramda";
  import { unProtectedRoutes } from "../utils/helper.js";
  import { isTokensPresentLocalStorage } from "../services/utils/helper.js";
  import { goto } from "@sapper/app";
  import api from "../services";

  export let segment;

  $: path = segment ? `/${segment}` : "/";

  const fetchAuthGuard = async route => {
    try {
      const isLoggedIn = isTokensPresentLocalStorage();
      const isProtectedRouted = !R.includes(route, unProtectedRoutes);

      if (isLoggedIn && !isProtectedRouted) {
        await goto("/");
      } else if (!isLoggedIn && isProtectedRouted) {
        await goto("/login");
      }
    } catch (error) {
      console.log("Error", error);
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
