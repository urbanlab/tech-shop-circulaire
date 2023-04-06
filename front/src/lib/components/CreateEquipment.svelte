<!-- A form to create a new equipment -->
<script async script lang="ts">
    import { goto } from "$app/navigation";
    import { currentEquipmentTypes, pb } from "$lib/store";
    import isDev from "$lib/utils/isDev";

    // Form utils =================================

    let errorMessage: string;

    // Form datas =================================

    let name: string = isDev() ? `Name ${Math.random() * 100}` : "";
    let reference: string = isDev() ? `Reference ${Math.random() * 100}` : "";
    let type: string = isDev() ? $currentEquipmentTypes[0]?.id : "";
    let date: string = isDev() ? new Date().toISOString().split("T")[0] : "";
    let purchaseCost: number = isDev() ? Math.round(Math.random() * 100) : 0;
    let desc: string = isDev()
        ? `Description ${Array.from({ length: Math.random() * 25 })
              .map(() => Math.random() * 100)
              .join(" ")}`
        : "";
    let tips: string = isDev()
        ? `Tips ${Array.from({ length: Math.random() * 25 })
              .map(() => Math.random() * 100)
              .join(" ")}`
        : "";
    let image: File;

    const createEquipment = async () => {
        const equipment = {
            name,
            reference,
            type,
            date,
            purchaseCost,
            desc,
            tips
        };
        // check if all fields are filled
        if (
            !equipment.name ||
            !equipment.reference ||
            !equipment.type ||
            !equipment.date ||
            !equipment.purchaseCost ||
            !equipment.desc ||
            !equipment.tips ||
            !image
        ) {
            errorMessage = "All fields are required";
            return;
        }

        console.log("Creating equipment: ", equipment);


        let newEquipmentId: string;
        try {
            const newEquipment = await pb.collection("equipments").create(equipment);

            newEquipmentId = newEquipment.id;
        } catch (err) {
            console.error("Creating equipment failed: ", err);
            // TODO: display error message to user
            return;
        }

        try {
            if (image) {
                const formData = new FormData();

                formData.append("image", image);

                await pb.collection("equipments").update(newEquipmentId, formData);
            }
        } catch (err) {
            console.error("Updating equipment with image failed: ", err);
            // TODO: display error message to user
            // NOTE : not a fatal error, the element is already created but without image
        }

        goto(`/equipment/${newEquipmentId}`);
    };

    // Equipment types options ====================
    $: equipmentTypesOptions = $currentEquipmentTypes.map((type) => ({
        value: type.id,
        label: type.name
    }));
    $: firstEquipmentType = $currentEquipmentTypes[0];

    // Image preview ==============================

    let imagePreview: string;

    const onImageSelected = (event: Event) => {
        const imageInput: HTMLInputElement = event.target as HTMLInputElement;

        if (!imageInput.files || imageInput.files.length === 0) {
            console.error("No file selected");
            return;
        }

        image = imageInput.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e: Event) => {
            const fileReader = e.target as FileReader;

            if (!fileReader.result) {
                console.error("No file selected");
                return;
            }

            imagePreview = fileReader.result.toString();
        };
    };
</script>

<section>
    <!-- Image input (select a local image, preview image) -->
    <label for="image">Image</label>
    {#if imagePreview}
        <img src={imagePreview} alt="preview" />
    {/if}
    <input type="file" accept="image/*" on:change={onImageSelected} />
    <br />

    <!-- Name input (text) -->
    <label for="name">Name</label>
    <input type="text" class="input input-bordered w-full max-w-xs" bind:value={name} />
    <br />

    <!-- Reference input (text) -->
    <label for="reference">Reference</label>
    <input
        type="text"
        class="input input-bordered w-full max-w-xs"
        bind:value={reference}
    />
    <br />

    <!-- Equipement type input (select from type in database) -->
    <label for="type">Type</label>
    <select class="select select-bordered w-full max-w-xs" bind:value={type}>
        {#each equipmentTypesOptions as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
    <br />

    <!-- Buing date input (date picker) -->
    <label for="date">Date</label>
    <input type="date" bind:value={date} />
    <br />

    <!-- Buing price (floating number) -->
    <label for="purchaseCost">Purchase cost</label>
    <input
        type="number"
        class="input input-bordered w-full max-w-xs"
        bind:value={purchaseCost}
    />
    <br />

    <!-- Description input (multi line text)-->
    <label for="description">Description</label>
    <!-- <textarea class="textarea" placeholder="Bio"></textarea> -->
    <textarea
        class="textarea textarea-bordered textarea-md w-full max-w-xs"
        bind:value={desc}
    />
    <br />

    <!-- Tips input (multi line text)-->
    <label for="tips">Tips</label>
    <textarea
        class="textarea textarea-bordered textarea-md w-full max-w-xs"
        bind:value={tips}
    />
    <br />

    <!-- Submit button -->
    <button class="btn" on:click={createEquipment}>Create</button>
    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}
</section>
