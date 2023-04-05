<script lang="ts">
    import { page } from '$app/stores';
    import { currentEquipments, type Equipment } from '$lib/store';

    const id = $page.params.id;
    console.log(id);

    $: editMode = false;

    $: equipment = $currentEquipments.find((equipment: Equipment) => equipment.id === id); // WARN : equipment can be undefined, handle this

</script>


<section>
    {#if equipment}
        <h1>Equipment</h1>
        <p>id: {id}</p>
        <p>name: {equipment.name}</p>
    {:else}
        <h1>Equipment not found</h1>
    {/if}
</section>

