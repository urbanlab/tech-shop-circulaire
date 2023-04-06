<script lang="ts">
  import QrCode from "../../../lib/components/QrCode.svelte";
  import StatCard from "../../../lib/components/StatCard.svelte";
  import ChevronLeft from "svelte-material-icons/ChevronLeft.svelte";
  import MoleculeCo2 from "svelte-material-icons/MoleculeCo2.svelte";

  import { PUBLIC_FRONT_DOMAIN_URL } from "$env/static/public";
  import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

  import { currentUser, currentEquipments, type Equipment } from "$lib/store";
  import FullButton from "$lib/components/buttons/FullButton.svelte";
  import BorderButton from "$lib/components/buttons/BorderButton.svelte";

  const mediaUrl = PUBLIC_POCKETBASE_URL + "/api/files/";
  import { page } from "$app/stores";

  import NewRentForm from "$lib/components/NewRentForm.svelte";
  import Title from "$lib/components/misc/Title.svelte";

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

  const onNewRentHistory = () => {
      editMode = false;
  };

  let stats = [
      {
          title: "Nombres d'échanges",
          icon: "handshake",
          value: "16",
          color: "theme-bg-green",
          bg: "theme-bg-light-green"
      },
      {
          title: "Economie réalisée",
          icon: "cash",
          value: "~9455€",
          color: "theme-bg-violet",
          bg: "bg-lime-500"
      },
      {
          title: "Economie de CO2",
          icon: "co2",
          value: "~2377Kg",
          color: "theme-bg-blue",
          bg: "bg-lime-900"
      }
  ];

  let history = [
      {
          month: "Mars",
          year: "2023",
          start: "17 mars",
          end: "17 avril",
          user: "Studio 24"
      },
      {
          month: "Mars",
          year: "2023",
          start: "5 juin",
          end: "17 avril",
          user: "WSK"
      }
  ];
</script>

<section class="flex flex-col">
  <div>
    <a href="/"><button class="btn theme-bg-violet border-none"> <ChevronLeft/> Retour au matériel mutualisé</button></a>
  </div>
  <!-- Dispo -->
  <div class="w-full h-8 theme-bg-light-green flex items-center pl-8 mt-4 mb-4 rounded-xl">
    <div class="w-2 h-2 rounded-full theme-bg-green">   </div>
    <p class="ml-4">Disponible</p>
  </div>

  <!-- Statistiques -->
  <div class="flex flex-col theme-bg-light-blue  rounded-3xl p-4">
    <p class="font-bold">Bilan produit</p>
      <div class="flex space-x-4 justify-center">
      {#each stats as stat}
        <StatCard
          title={stat.title}
          icon={stat.icon}
          value={stat.value}
          color={stat.color}
        />
      {/each}
    </div>
  </div>
  <!-- Equipement -->
  {#if equipment}
    <Title title="Identité de l'appareil" />
    <div class="flex lg:flex-row flex-col w-full mt-4 justify-center ">

      <div class="lg:1/2">
        <div class=" w-96 h-96 bg-contain bg-center bg-no-repeat rounded-2xl flex justify-start items-end text-white font-bold" style="background-image: url({mediaUrl + equipment.collectionId + "/" + equipment.id + "/" +  equipment.image});">
          <div class="p-4">
            <p>{equipment.name}</p>
            <p>{$currentUser.structure}</p>
          </div>
        </div>
      </div>
      <div class="flex  lg:1/2 flex-col w-full pl-8">
        <div>
          <p>Nom de l'appareil</p>
          <input type="text" value={equipment.name} class="input input-bordered w-full max-w-xs" disabled/>
        </div>
        <!--Inputs-->
        <div class="flex flex-wrap">
          <div>
            <p>Référence de l'appareil</p>
            <input type="text" value={equipment.reference} class="input input-bordered w-full max-w-xs" disabled/>
          </div>
          <div>
            <p>Typologie de matériel</p>
            <input type="text" value={equipment?.expand?.type?.name} class="input input-bordered w-full max-w-xs" disabled/>
          </div>
          <div>
            <p>Date d'achat</p>
            <input type="text" value={equipment.date} class="input input-bordered w-full max-w-xs" disabled/>
          </div>
          <div>
            <p>Prix d'achat</p>
            <input type="text" value={equipment.purchaseCost + " €"} class="input input-bordered w-full max-w-xs" disabled/>
          </div>
          <div>
        </div>
        </div>


        <!-- Co2 info -->

        <div class="bg-blue-400 rounded-3xl flex items-center p-4 mt-4">
          <div class="bg-white rounded-xl w-12 h-12 flex justify-center items-center mr-4">
            <MoleculeCo2/>
          </div>
          <div>
            <p>Impact co2 à l'achat estimé</p>
            <p>~{equipment?.expand?.type?.co2Weight} Kg</p>
          </div>
        </div>
      </div>


    </div>
    <!-- QR Code -->
    <div class="theme-bg-dark-blue text-white rounded-2xl p-4 mt-4 mb-4 flex justify-between">
      <!--Text section-->
      <div class=" w-1/2">
        <Title title="Etiquette d'identification" />
        <p>
          Pour faciliter le prêt sans utiliser votre ordinateur et permettre à vos partenaires d’accéder aux informations de votre appareil facilement, imprimez, décorez et collez l’étiquette d’identification sur votre appareil !
        </p>
        <div class="flex space-x-4">
          <FullButton text="Imprimer l'étiquette" />
          <BorderButton text="Comment l'installer ?" />
        </div>
      </div>

      <!--QR Code section-->
      <div class="flex w-52 rounded-2xl bg-white text-black justify-center items-center">
        <!--<div>
          <div>
            <p>Salut je m'appelle</p>
            <p> {equipment.name}</p>
          </div>
          <div>
            <p>J'habite Chez</p>
            <p>{$currentUser.structure}</p>
          </div>
        </div>-->
        <QrCode codeValue={PUBLIC_FRONT_DOMAIN_URL + "/equipment/" + equipment.id} squareSize={100} />
      </div>
    </div>

      <!--More info -->
      <Title title="Fiche produit" />
      <div class="flex w-full">
        <div class="w-1/2">
          <p>Description de l'appareil</p>
          <input type="text" value={equipment.desc} class="input input-bordered w-full max-w-xs" disabled/>
        </div>
        <div>
          <p>Règles d’usage et conditions d’utilisation</p>
          <input type="text" value={equipment.tips} class="input input-bordered w-full max-w-xs" disabled/>
        </div>
      </div>

      <!-- Suivi-->
      <div>
        <Title title={"Suivi de l'appareil"} />
        {#if equipment?.expand?.rentHistories && rentHistoriesWithMonth && rentHistoriesMonths}
            <!-- Group by month -->
            {#each rentHistoriesMonths as rentHistoriesMonth}
                <h2 class="font-bold">{rentHistoriesMonth}</h2>
                {#each rentHistoriesWithMonth as rentHistory}
                    {#if rentHistory.monthYear === rentHistoriesMonth}
                        <div>
                            <p>Du {rentHistory.startDate} au {rentHistory.stopDate} - {rentHistory.borrowerStructure}</p>
                        </div>
                    {/if}
                {/each}
            {/each}
        {:else}
            <p>Aucun historique de location</p>
        {/if}
      </div>

      <!--Actions-->
      <div class="flex mt-8">
        <span on:click={() => editMode = !editMode}><BorderButton text="Editer la fiche matériel" /></span>
        <FullButton text="Supprimer le matériel" />

        {#if editMode}
            <!-- Open modal button -->
            <label for="my-modal" class="rounded-3xl  theme-bg-violet cursor-pointer pl-4 pr-4 pt-2 pb-2">Prêter l’appareil</label>

            <!-- Modal -->
            <input type="checkbox" id="my-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <NewRentForm equipement={equipment} bind:editMode onNewRentHistory={onNewRentHistory} />
                </div>
            </div>
        {/if}
      </div>
  {/if}
</section>
