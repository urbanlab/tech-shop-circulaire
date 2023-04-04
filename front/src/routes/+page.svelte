<script lang="ts">
  import Inventory from "$lib/components/Inventory.svelte";
import Nav from "$lib/components/Nav.svelte";
import { currentUser } from "$lib/store";
import Login from "../lib/components/Login.svelte";


</script>
<section class="h-screen">
  {#if $currentUser}
    <Nav />
    <Inventory />
  {:else}
  <div class="flex justify-center h-screen items-center">
    <div class="absolute left-0 bottom-0 m-16 ">STATS</div>
    <div class="absolute right-0 top-0 m-16 ">STATS</div>
    <div class="absolute right-0 bottom-0 m-16 ">STATS</div>
    <Login />
  </div>
  {/if}

</section>