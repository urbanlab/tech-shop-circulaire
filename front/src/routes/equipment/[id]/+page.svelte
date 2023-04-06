<script lang="ts">
  import QrCode from "../../../lib/components/QrCode.svelte";
  import StatCard from "../../../lib/components/StatCard.svelte";
  import ChevronLeft from "svelte-material-icons/ChevronLeft.svelte";
  import MoleculeCo2 from "svelte-material-icons/MoleculeCo2.svelte";

  import Title from "../../../lib/components/misc/Title.svelte";
  import { PUBLIC_FRONT_DOMAIN_URL } from "$env/static/public";
  import {PUBLIC_POCKETBASE_URL} from '$env/static/public'


  import { page } from '$app/stores';
  import { currentUser, currentEquipments, type Equipment } from '$lib/store';
    import FullButton from "$lib/components/buttons/FullButton.svelte";
    import BorderButton from "$lib/components/buttons/BorderButton.svelte";


  const mediaUrl = PUBLIC_POCKETBASE_URL + "/api/files/";
  const id = $page.params.id;

  let canEdit = false;

  $: equipment = $currentEquipments.find((equipment: Equipment) => equipment.id === id); // WARN : equipment can be undefined, handle this


  let stats = [
    {
      title: "Nombres d'échanges",
      icon: "handshake",
      value: "16",
      color: "theme-bg-green",
      bg: "theme-bg-light-green",
    },
    {
      title: "Economie réalisée",
      icon: "cash",
      value: "~9455€",
      color: "theme-bg-violet",
      bg: "bg-lime-500",
    },
    {
      title: "Economie de CO2",
      icon: "co2",
      value: "~2377Kg",
      color: "theme-bg-blue",
      bg: "bg-lime-900",
    },
  ];

  let history = [
    {
      "month": "Mars",
      "year": "2023",
      "start": "17 mars",
      "end": "17 avril",
      "user": "Studio 24"
    },
    {
      "month": "Mars",
      "year": "2023",
      "start": "5 juin",
      "end": "17 avril",
      "user": "WSK"
    }
  ]

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
    <div class="flex w-full mt-4">
      
      <div class="1/2">
        <div class="w-96 h-96 bg-contain bg-center bg-no-repeat rounded-2xl flex justify-start items-end text-white font-bold" style="background-image: url({mediaUrl + equipment.collectionId + "/" + equipment.id + "/" +  equipment.image});">
          <div class="p-4">
            <p>{equipment.name}</p>
            <p>{$currentUser.structure}</p>
          </div>  
        </div>
      </div>
      <div class="flex 1/2 flex-col w-full pl-8">
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
            <input type="text" value={equipment.type} class="input input-bordered w-full max-w-xs" disabled/>
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
            <p>Impact co2 à l'achat éstimé</p>
            <p>~400 400Kg</p>
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
        <QrCode codeValue={PUBLIC_FRONT_DOMAIN_URL + "/equipment/" + equipment.id} squareSize=100 />
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
        {#each history as item }
          <div>
            <p>{item.month}  {item.year}</p>
            <p>Du {item.start} au {item.end} {item.year} - {item.user}</p>
          </div>
        {/each}
      </div>

      <!--Actions-->
      <div>
        <button>Modifier</button>
        <button>Supprimer</button>
      </div>

  {/if}
</section>
