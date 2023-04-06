<script lang="ts">
    import { pb, type Equipment, type RentHistory } from "$lib/store";
    import isDev from "$lib/utils/isDev";

    export let equipement: Equipment;
    export let editMode: boolean;
    export let onNewRentHistory: () => void;

    let startDate: string = isDev() ? new Date().toISOString().split("T")[0] : "";
    let stopDate: string = isDev() ? new Date().toISOString().split("T")[0] : "";
    let borrowerMail: string = isDev() ? "tito@test.com" : "";
    let borrowerStructure: string = isDev() ? "Structure" : "";
    let borrowerName: string = isDev() ? "Tito" : "";

    let canSubmit: boolean = false;

    const checkFormCompletion = () => {
        if (
            !startDate ||
            !stopDate ||
            !borrowerName ||
            !borrowerMail ||
            !borrowerStructure
        ) {
            return false;
        }
        return true;
    };

    const onChangeForm = () => {
        canSubmit = checkFormCompletion();
    };

    const submitForm = async () => {
        if (!canSubmit) return;

        const rentHistory: Omit<RentHistory, "id"> = {
            startDate,
            stopDate,
            borrowerName,
            borrowerMail,
            borrowerStructure
        };

        // Create new rentHistory
        let newRentHistory;
        try {
            newRentHistory = await pb.collection("rentHistory").create(rentHistory);
        } catch (error) {
            console.error(error);
            // TODO: display error message to user
            return;
        }

        // Update equipment with new rentHistory
        try {
            console.log('start update equipment', equipement.id, newRentHistory.id);
            await pb.collection("equipments").update(equipement.id, {
                rentHistories: [...equipement.rentHistories, newRentHistory.id]
            });
            console.log('end update equipment');
        } catch (error) {
            console.error(error);
            // TODO: delete newRentHistory
            // TODO: display error message to user
            return;
        }

        editMode = false;
        onNewRentHistory();
    };
</script>

<!-- Start date input (date picker) -->
<div class="form-control w-full max-w-xs">
    <label class="label">
        <span class="label-text">Date de début</span>
    </label>
    <input
        type="date"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
        bind:value={startDate}
        on:change={onChangeForm}
    />
</div>

<!-- Stop date input (date picker) -->
<div class="form-control w-full max-w-xs">
    <label class="label">
        <span class="label-text">Date de fin</span>
    </label>
    <input
        type="date"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
        bind:value={stopDate}
        on:change={onChangeForm}
    />
</div>

<!-- Borrower name input (text) -->
<div class="form-control w-full max-w-xs">
    <label class="label">
        <span class="label-text">Nom du prêteur</span>
    </label>
    <input
        type="text"
        placeholder="Thomas Escure"
        class="input input-bordered w-full max-w-xs"
        bind:value={borrowerName}
        on:change={onChangeForm}
    />
</div>

<!-- Borrower structure input (text) -->
<div class="form-control w-full max-w-xs">
    <label class="label">
        <span class="label-text">Structure de l'emprunteur</span>
    </label>
    <input
        type="text"
        placeholder="Erasme"
        class="input input-bordered w-full max-w-xs"
        bind:value={borrowerStructure}
        on:change={onChangeForm}
    />
</div>

<!-- Borrower mail input (text) -->
<div class="form-control w-full max-w-xs">
    <label class="label">
        <span class="label-text">Mail de l'emprunteur</span>
    </label>
    <input
        type="text"
        placeholder="thomas@erasme.fr"
        class="input input-bordered w-full max-w-xs"
        bind:value={borrowerMail}
        on:change={onChangeForm}
    />
</div>

<button class="btn btn-outline btn-secondary" on:click={() => (editMode = false)}
    >Annuler</button
>
<button class="btn btn-primary" on:click={submitForm} disabled={!canSubmit}
    >Engager le prêt</button
>

<section />
