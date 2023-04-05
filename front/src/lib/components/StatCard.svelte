<script lang="ts">

    import HandShake from "svelte-material-icons/Handshake.svelte";
    import Cash from "svelte-material-icons/Cash.svelte";
    import MoleculeCo2 from "svelte-material-icons/MoleculeCo2.svelte";

    export let title: string;
    export let icon: string;
    export let value: string;
    export let color: string;

    let iconSize: number = 30;

</script>
<section>
    <div class=" bg-white rounded-3xl mt-4 mb-4">
        <div class="flex p-4">
          <div class="rounded-lg {color} w-11 flex justify-center items-center mr-4">
            {#if icon === "handshake"}
              <HandShake size={iconSize} />
            {:else if icon === "cash"}
              <Cash  size={iconSize} />
            {:else if icon === "co2"}
                <MoleculeCo2 size={iconSize} />
            {/if}
          </div>
          <div class="flex flex-col">
            <span>{title}</span>
            <span class="font-bold">{value}</span>
          </div>
        </div>
      </div>
</section>