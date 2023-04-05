<script lang="ts">
  import ChevronDown from "svelte-material-icons/ChevronDown.svelte";
  import { logout } from "$lib/utils/auth";
  import { currentUser } from "$lib/store";
  import { text } from "svelte/internal";
  import Title from "./misc/Title.svelte";
  import StatCard from "./StatCard.svelte";


  let stats = [
    {
      title: "Nombres d'échanges",
      icon: "handshake",
      value: "16",
      color: "bg-lime-100"
    },
    {
      title:"Economie réalisée",
      icon: "cash",
      value: "~9455€",
      color: "bg-lime-500"

    },
    {
      title : "Economie de CO2",
      icon: "co2",
      value: "~2377Kg",
      color: "bg-lime-900"
    }
  ]

</script>

<section class="flex flex-col justify-between h-full">
  <div>
    <Title title="Mon matériel mutualisé" />
    <div class="dropdown dropdown-bottom dropdown-end">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="m-1 flex cursor-pointer">
          <ChevronDown />
          <div class="ml-1">
            <p class="font-bold">{$currentUser.structure}</p>
            <p>{$currentUser.username}</p>
          </div>
      </label>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <ul tabindex="0" class="dropdown-content menu p-2">
        <li class="cursor-pointer" on:click={() => logout()}>Déconexion</li>
      </ul>
    </div>
  </div>
  
  <div>
    <p>Bilan de ma structure</p>
    {#each stats as stat}
      <StatCard title={stat.title} icon={stat.icon} value={stat.value} color={stat.color}/>
    {/each}
  </div>
</section>
