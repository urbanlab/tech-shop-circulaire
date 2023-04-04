<script lang= "ts" >
  import Title from "./misc/Title.svelte";

    let equipmentTypes= [
        {id: 1, name: "Ordinateur"},
        {id: 2, name: "Imprimante"},
        {id: 3, name: "Scanner"},
        {id: 4, name: "Autre"},
    ]

</script>
<section>
    <Title title="Mon materiel mutualisé" />
    <div class="alert alert-info shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Le matériel mutualisé n’est visible que par moi</span>
        </div>
      </div>
    <button class="btn">+ Enregistrer un matériel</button>

    <div>
        Filtrer
        {#each equipmentTypes as equipmentType}
            <label class="checkbox">
                <input type="checkbox" />
                <span class="checkbox-mark"></span>
                <span class="ml-2">{equipmentType.name}</span>
            </label>
        {/each}
    </div>
</section>
