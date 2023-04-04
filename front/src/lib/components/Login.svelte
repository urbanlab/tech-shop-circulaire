<script lang="ts">
  import { login } from "$lib/utils/auth";



    let email: string;
    let password: string;

</script>
<section>
    <!--Disable form redirect-->
    <form on:submit|preventDefault>
        <h1 class="text-center">Connexion</h1>
        <div class="form-control w-full max-w-xs">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <input type="text" placeholder="Votre Email" class="input input-bordered w-full max-w-xs" bind:value={email} />
            <input type="password" placeholder="Mot de passe" class="input input-bordered w-full max-w-xs" bind:value={password} />
            <button type="submit" class="btn btn-primary" on:click={login(email,password)} >Se connecter</button>
        </div>
    </form>
</section>