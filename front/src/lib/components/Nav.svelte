<script lang="ts">
    import { logout } from "$lib/utils/auth";
    import { currentUser } from "$lib/store";
</script>

<section>
    <nav class="flex justify-between">
        <ul>Logo ?</ul>
        <div class="dropdown dropdown-hover">
            {#if $currentUser}

                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class=" m-1">{$currentUser.structure}</label>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100w-52">
                    <li>{$currentUser.username}</li>
                    <li><a href="/logout" on:click|preventDefault={logout}>Logout</a></li>
                </ul>
            {/if}
        </div>
    </nav>
</section>