<script>
    import "../app.css";

    import { onMount } from "svelte";
  import { watchUserChange, watchEquipmentsChange, watchEquipmentTypesChange } from "../lib/store";

    onMount(() => {
        console.log("mounted");
        watchUserChange()
        watchEquipmentsChange()
        watchEquipmentTypesChange()
    });
  </script>

  <slot />