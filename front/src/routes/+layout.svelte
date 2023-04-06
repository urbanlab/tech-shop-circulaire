<script>
    import "../app.css";
    import Nav from "$lib/components/Nav.svelte";

    import { onMount } from "svelte";
  import { watchUserChange, watchEquipmentsChange, currentUser, watchEquipmentTypesChange } from "../lib/store";
  import Login from "$lib/components/Login.svelte";
    onMount(() => {
        watchUserChange()
        watchEquipmentsChange()
        watchEquipmentTypesChange()
    });
  </script>
<html lang="fr" class="">
  <body data-theme="customTheme" class="bg-[#cbe4de80] flex min-h-screen w-screen">
    {#if $currentUser}
    <div class="lg:w-3/12  mr-4 hidden lg:block">
      <Nav/>
    </div>
    <div class="bg-white h-full rounded-t-2xl p-8 pt-10 mt-10 lg:w-9/12">
      <slot />
    </div>
    {:else}
    <div class="flex h-screen justify-center items-center">
      <Login />
    </div>
    {/if}
  </body>
  
</html>
