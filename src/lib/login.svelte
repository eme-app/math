<script lang="ts">
    import { user, pb } from "./pocketbase";

    let username
    let password

    async function login() {
        console.log("hi");
        
        try {
        await pb.collection('eme_users').authWithPassword(username,password)
        } catch(error) {
            console.log(error);
            
        }
    }
</script>

{#if $user}
    <p>Hallo, {$user.username}</p>
{:else}
<form on:submit|preventDefault>
    <input type="text" placeholder="Name" bind:value={username} class="input">
    <input type="password" placeholder="Passwort" bind:value={password} class="input">
    <button id="login" on:click={login}>Anmelden</button>
</form>
{/if}