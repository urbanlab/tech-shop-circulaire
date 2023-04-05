<script>
    import "../app.css";

    import { onMount } from "svelte";
  import { watchUserChange, watchEquipmentsChange } from "../lib/store";

    onMount(() => {
        console.log("mounted");
        watchUserChange()
        watchEquipmentsChange()
    });
  </script>

  <slot />