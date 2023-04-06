<script lang="ts">
    import { page } from "$app/stores";
    import {
        currentEquipments,
        currentRentHistories,
        pb,
        type Equipment,
        type RentHistory
    } from "$lib/store";
    import { resolveUrlToImage } from "$lib/utils/pocket-base";
    import Title from "./misc/Title.svelte";
    import Pencil from "svelte-material-icons/Pencil.svelte";
    import PencilOff from "svelte-material-icons/PencilOff.svelte";

    const id = $page.params.id;
    console.log(id);

    $: editMode = false;

    $: equipment = $currentEquipments.find((equipment: Equipment) => equipment.id === id); // WARN : equipment can be undefined, handle this
    $: console.log({ equipment }); // FIXME : remove this after dev
</script>

<section>
    {#if equipment}
        <Title title={"Fiche produit: "} />
        <button class="btn btn-primary" on:click={() => (editMode = !editMode)}>
            {#if editMode}
                <PencilOff />
            {:else}
                <Pencil />
            {/if}
        </button>

        <div class="avatar">
            <div class="w-24 rounded">
                <img
                    src={resolveUrlToImage("equipments", equipment.id, equipment.image)}
                    alt={equipment.name}
                />
            </div>
        </div>

        <p><strong>Name</strong>: {equipment.name}</p>
        <p><strong>Reference</strong>: {equipment.reference}</p>

        {#if equipment?.expand?.type}
            <!-- WARN : equipment.expand doesn't exist if the page is load after creation, page must be reload  -->
            <p><strong>Type</strong>: {equipment.expand.type.name}</p>
        {/if}

        <p><strong>Purchase date</strong>: {equipment.date}</p>
        <p><strong>Purchase cost</strong>: {equipment.purchaseCost}</p>

        <p><strong>Description</strong>: {equipment.desc}</p>

        <p><strong>Tips</strong>: {equipment.tips}</p>

        <hr />

        <Title title={"Historique de location"} />
        {#if equipment?.expand?.rentHistories}
            {#each equipment.expand.rentHistories as rentHistory}
                <div class="border-2">
                    <p><strong>Start date</strong>: {rentHistory.startDate}</p>
                    <p><strong>End date</strong>: {rentHistory.stopDate}</p>
                    <p><strong>Borrower email</strong>: {rentHistory.borrowerMail}</p>
                    <p>
                        <strong>Borrower structure</strong>: {rentHistory.borrowerStructure}
                    </p>
                </div>
            {/each}
        {:else}
            <p>Aucun historique de location</p>
        {/if}
    {:else}
        <h1>Equipment not found</h1>
    {/if}
</section>
