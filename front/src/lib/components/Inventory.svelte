<script lang= "ts" >
  import { currentEquipments, pb } from "$lib/store";
  import {PUBLIC_POCKETBASE_URL} from '$env/static/public'
  import Plus from "svelte-material-icons/Plus.svelte";
  import Filter from "svelte-material-icons/Filter.svelte";

  let equipmentTypes= [
      {id: 1, name: "Ordinateur"},
      {id: 2, name: "Imprimante"},
      {id: 3, name: "Scanner"},
      {id: 4, name: "Autre"},
  ]

  const mediaUrl = PUBLIC_POCKETBASE_URL + "/api/files/";

</script>
<section>
    <div class="alert alert-info mb-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Le matériel mutualisé n’est visible que par moi</span>
        </div>
      </div>
    <div>
      <div class="flex flex-row mb-4">
        <Filter />
        <p>Filtrer par</p> 
        <select>
            {#each equipmentTypes as equipmentType}
                <option value={equipmentType.id}>{equipmentType.name}</option>
            {/each}
        </select>
      </div>

      <div class="container flex">
        <div class="flex flex-row flex-wrap">
          {#each $currentEquipments as currentEquipment}
          <a href="/equipment/{currentEquipment.id}">
            <div class="cursor-pointer w-64 h-80 mr-4 mb-4 hover:opacity-80 rounded-2xl border overflow-hidden border-slate-200  bg-cover bg-center bg-no-repeat" style="background-image: url({mediaUrl + currentEquipment.collectionId + "/" + currentEquipment.id + "/" +  currentEquipment.image});">
              <div class="h-52 flex justify-end items-end">
                <span class="m-4 bg-white pl-3 pr-4 rounded-3xl">Type</span>
              </div>
              <div class="bg-white p-4">
                <h2>{currentEquipment.name}</h2>
                <p>{currentEquipment.desc}</p>
              </div>
              <div class="w-full  bg-green-200 h-10 flex items-center pl-8">
                <div class="rounded-full w-4 h-4 bg-green-600 mr-4"></div>
                <p>Disponible</p>
              </div>
            </div>
          </a>
          {/each}
          <div class="flex border border-dashed hover:bg-slate-200  hover:border-white cursor-pointer  w-64 h-80 rounded-2xl justify-center items-center">
            <Plus/>
            <p>Ajouter un matériel</p>
          </div>
        </div>
        </div>
      </div>
      
    <button class="btn fixed right-4 bottom-4"><Plus/> Ajouter un matériel</button>
</section>
