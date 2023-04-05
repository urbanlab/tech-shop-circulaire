<!-- A form to create a new equipment -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { pb } from "$lib/store";

    let name: string = "";
    let reference: string = "";
    let type: string = "";
    let buyingDate: string = "";
    let buyingPrice: number = 0;
    let description: string = "";
    let tips: string = "";

    let image: any;
    let imagePreview: any;

    const onImageSelected = (event: Event) => {
        const imageInput: HTMLInputElement = event.target as HTMLInputElement;

        if (!imageInput.files || imageInput.files.length === 0) {
            console.error("No file selected");
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(imageInput.files[0]);
        reader.onload = (e: Event) => {
            const fileReader = e.target as FileReader;
            console.log(fileReader);

            if (!fileReader.result) {
                console.error("No file selected");
                return;
            }

            imagePreview = fileReader.result;
        };
    };

    const createEquipment = async () => {
        const equipment = {
            name,
            reference,
            type,
            buyingDate,
            buyingPrice,
            description,
            tips
        };

        try {
            console.log("Creating equipment, input: ", equipment); // FIXME: remove after integration

            const newEquipment = await pb.collection("equipments").create(equipment);
            console.log("Created equipment: ", newEquipment); // FIXME: remove after integration

            goto(`/equipment/${newEquipment.id}`);
        } catch (err) {
            console.error("Creating equipment failed: ", err);
            // TODO: display error message to user
        }
    };
</script>

<section>
    <!-- Image input (select a local image, preview image) -->
    <label for="image">Image</label>
    {#if imagePreview}
        <img src={imagePreview} alt="preview" />
    {/if}
    <input type="file" accept="image/*" bind:files={image} on:change={onImageSelected} />
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
    <input type="text" class="input input-bordered w-full max-w-xs" bind:value={type} />
    <br />

    <!-- Buing date input (date picker) -->
    <label for="buyingDate">Buying date</label>
    <input type="date" bind:value={buyingDate} />
    <br />

    <!-- Buing price (floating number) -->
    <label for="buyingPrice">Buying price</label>
    <input
        type="number"
        class="input input-bordered w-full max-w-xs"
        bind:value={buyingPrice}
    />
    <br />

    <!-- Description input (multi line text)-->
    <label for="description">Description</label>
    <input
        type="text"
        class="input input-bordered w-full max-w-xs"
        bind:value={description}
    />
    <br />

    <!-- Tips input (multi line text)-->
    <label for="tips">Tips</label>
    <input type="text" class="input input-bordered w-full max-w-xs" bind:value={tips} />
    <br />

    <!-- Submit button -->
    <button class="btn" on:click={createEquipment}>Create</button>
</section>
