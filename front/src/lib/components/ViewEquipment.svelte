<script lang="ts">
    import { page } from "$app/stores";
    import { currentEquipments, currentUser, type Equipment } from "$lib/store";
    import { resolveUrlToImage } from "$lib/utils/pocket-base";
    import Title from "./misc/Title.svelte";
    import Pencil from "svelte-material-icons/Pencil.svelte";
    import PencilOff from "svelte-material-icons/PencilOff.svelte";
    import NewRentForm from "./NewRentForm.svelte";

    const id = $page.params.id;

    $: editMode = false;

    $: equipment = $currentEquipments.find((equipment: Equipment) => equipment.id === id); // WARN : equipment can be undefined, handle this
    $: console.log({ equipment }); // FIXME : remove this after dev

    $: rentHistoriesWithMonth = equipment?.expand?.rentHistories
        ?.map((rentHistory) => {
            const month: string = new Date(rentHistory.startDate).toLocaleString(
                "default",
                {
                    month: "long"
                }
            );
            const year: number = new Date(rentHistory.startDate).getFullYear();
            const monthYear = `${month} ${year}`;
            return { ...rentHistory, monthYear };
        })
        .sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return dateB.getTime() - dateA.getTime();
        });
    $: console.log({ rentHistoriesWithMonth }); // FIXME : remove this after dev

    $: rentHistoriesMonths = rentHistoriesWithMonth?.reduce(
        (acc: string[], rentHistory) => {
            if (!acc.includes(rentHistory.monthYear)) {
                acc.push(rentHistory.monthYear);
            }
            return acc;
        },
        []
    );
    $: console.log({ rentHistoriesMonths }); // FIXME : remove this after dev
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

        {#if equipment?.expand?.rentHistories && rentHistoriesWithMonth && rentHistoriesMonths}
            <!-- Group by month -->
            {#each rentHistoriesMonths as rentHistoriesMonth}
                <h2>{rentHistoriesMonth}</h2>
                {#each rentHistoriesWithMonth as rentHistory}
                    {#if rentHistory.monthYear === rentHistoriesMonth}
                        <div class="border-2">
                            <p><strong>Start date</strong>: {rentHistory.startDate}</p>
                            <p><strong>End date</strong>: {rentHistory.stopDate}</p>
                            <p>
                                <strong>Borrower name</strong>: {rentHistory.borrowerName}
                            </p>
                            <p>
                                <strong>Borrower email</strong>: {rentHistory.borrowerMail}
                            </p>
                            <p>
                                <strong>Borrower structure</strong>:
                                {rentHistory.borrowerStructure}
                            </p>
                        </div>
                    {/if}
                {/each}
            {/each}
        {:else}
            <p>Aucun historique de location</p>
        {/if}

        {#if editMode}
            <!-- Open modal button -->
            <label for="my-modal" class="btn">Prêter l’appareil</label>

            <!-- Modal -->
            <input type="checkbox" id="my-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <NewRentForm equipement={equipment} bind:editMode />
                </div>
            </div>
        {/if}
    {:else}
        <h1>Equipment not found</h1>
    {/if}
</section>
