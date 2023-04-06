<script>
  import QrCode from "../../../lib/components/QrCode.svelte";
  import StatCard from "../../../lib/components/StatCard.svelte";
  import Title from "../../../lib/components/misc/Title.svelte";
  import { PUBLIC_FRONT_DOMAIN_URL } from "$env/static/public";

  import { page } from '$app/stores';
  import { currentEquipments, type Equipment } from '$lib/store';

  const id = $page.params.id;
  console.log(id);

  $: editMode = false;

  $: equipment = $currentEquipments.find((equipment: Equipment) => equipment.id === id); // WARN : equipment can be undefined, handle this


  let stats = [
    {
      title: "Nombres d'échanges",
      icon: "handshake",
      value: "16",
      color: "bg-lime-100",
    },
    {
      title: "Economie réalisée",
      icon: "cash",
      value: "~9455€",
      color: "bg-lime-500",
    },
    {
      title: "Economie de CO2",
      icon: "co2",
      value: "~2377Kg",
      color: "bg-lime-900",
    },
  ];

</script>

<section>
  <Title title="Mon matériel" />
  <p>Bilan produit</p>
  <div class="flex">
    {#each stats as stat}
      <StatCard
        title={stat.title}
        icon={stat.icon}
        value={stat.value}
        color={stat.color}
      />
    {/each}
  </div>
    <div class="w-80 h-80">
      <p>Imprimer mon code QR</p>
      <button on:click={() => saveQRCode()}>Télécharger et Imprimer</button>
      <QrCode codeValue={PUBLIC_FRONT_DOMAIN_URL + "/equipment/" + equipment.id} squareSize=200 />
      <canvas id="canvas" width="200" height="200">
        <QrCode codeValue={PUBLIC_FRONT_DOMAIN_URL + "/equipment/" + equipment.id} squareSize=200 />
      </canvas>
    </div>
</section>
