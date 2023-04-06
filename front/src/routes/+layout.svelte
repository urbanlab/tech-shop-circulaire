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
<body data-theme="customTheme" class="bg-[#cbe4de80] flex w-screen h-screen">
  {#if $currentUser}
  <div class="w-3/12 pt-10 mr-4">
    <Nav/>
  </div>
  <div class="bg-white w-full h-full rounded-t-2xl p-8 pt-10 w-9/12">
    <slot />
  </div>
  {:else}
  <div class="flex w-screen h-screen justify-center items-center">
    <Login />
  </div>
  {/if}
</body>
