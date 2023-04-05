<script>
    import "../app.css";
    import Nav from "$lib/components/Nav.svelte";

    import { onMount } from "svelte";
  import { watchUserChange, watchEquipmentsChange, currentUser } from "../lib/store";
  import Login from "$lib/components/Login.svelte";

    onMount(() => {
        console.log("mounted");
        watchUserChange()
        watchEquipmentsChange()
    });
  </script>
<body class="bg-slate-300 flex w-screen h-screen ">
  {#if $currentUser}
  <div class="w-3/12 pt-10 mr-4">
    <Nav/>
  </div>
  <div class="pt-10 w-9/12">
    <slot />
  </div>
  {:else}
  <div class="flex w-screen h-screen justify-center items-center">
    <Login />
  </div>
  {/if}
</body>
