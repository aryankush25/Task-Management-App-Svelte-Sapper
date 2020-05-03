<script>
  import * as R from "ramda";
  import { unProtectedRoutes } from "../utils/helper.js";
  import { isTokensPresentLocalStorage } from "../services/utils/helper.js";
  import { goto } from "@sapper/app";

  export let segment;

  const isLoggedIn = true;
  const isProtectedRouted = !R.includes(`/${segment}`, unProtectedRoutes);

  if (isLoggedIn && !isProtectedRouted) {
    // goto('/')
  } else if (!isLoggedIn && isProtectedRouted) {
    // goto('/login')
  }

  console.log("isLoggedIn", isLoggedIn);
  console.log("isProtectedRouted", isProtectedRouted);

  console.log(segment);
</script>

<style>
  main {
    font-family: monospace;
  }
</style>

<main>
  <slot />
</main>
