<script lang="ts">
  import Inventory from "$lib/components/Inventory.svelte";
import Nav from "$lib/components/Nav.svelte";
import { currentUser } from "$lib/store";
import Login from "../lib/components/Login.svelte";


</script>
<section class="h-screen">
  {#if $currentUser}
    <Inventory />
  {/if}
</section>