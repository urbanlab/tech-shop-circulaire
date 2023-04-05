<script lang= "ts" >
  import { currentEquipments, pb } from "$lib/store";
  import Plus from "svelte-material-icons/Plus.svelte";
  import Filter from "svelte-material-icons/Filter.svelte";


    let equipmentTypes= [
        {id: 1, name: "Ordinateur"},
        {id: 2, name: "Imprimante"},
        {id: 3, name: "Scanner"},
        {id: 4, name: "Autre"},
    ]

    let create = false;

  const equipmentData = {
    name : "TOTO",
  }



  $: {
    if (create) {
      createEquipment();
      create = false;
    }
    console.log($currentEquipments);
  }

    const createEquipment = async () => {
        try {
          await pb.collection("equipments").create(equipmentData)
        } catch (err) {
          console.error("Error creating equipment: ", err);
        }
    }

</script>
<section>
    <div class="alert alert-info shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Le matériel mutualisé n’est visible que par moi</span>
        </div>
      </div>
    <div>
      <div class="flex flex-row">
        <Filter />
        <p>Filtrer par</p> 
        <select>
            {#each equipmentTypes as equipmentType}
                <option value={equipmentType.id}>{equipmentType.name}</option>
            {/each}
        </select>
      </div>

        {#each $currentEquipments as currentEquipment}
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">
              {currentEquipment.name}
            </h2>
            <p>{currentEquipment.desc}</p>
            <div class="card-actions justify-end">
              <div class="badge badge-outline">Fashion</div>
              <div class="badge badge-outline">Products</div>
            </div>
            <div class="w-full bg-green-700">HELLLOOO</div>
          </div>
        </div>

        <div class="rounded-md border border-black">
          HELLO
        </div>
        {/each}
        <div class="border">
          <Plus/>
          <p>Ajouter un matériel</p>
        </div>
    </div>
    <button class="btn absolute right-0 bottom-0" on:click={() => create = true}><Plus/> Ajouter un matériel</button>
</section>
