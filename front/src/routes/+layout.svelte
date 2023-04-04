<script>
    import "../app.css";

    import { onMount } from "svelte";
  import { watchUserChange } from "../lib/store";

    onMount(() => {
        console.log("mounted");
        watchUserChange()
    });
  </script>

  <slot />