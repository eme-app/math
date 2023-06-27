<script lang="ts">
    import { user, pb } from "./pocketbase";

    let username
    let password

    async function login() {
        try {
        await pb.collection('eme_users').authWithPassword(username,password)
        } catch(error) {
            console.log(error);
            
        }
    }
    async function logout() {
        try {
            pb.authStore.clear()
        } catch(error) {
            console.log(error);
        }
    }
</script>

{#if $user}
<button id="logout" on:click={logout}>angemeldet als {$user.username}<br><a id="logout-test">abmelden</a></button>
{:else}
<form on:submit|preventDefault>
    <div id="form">
        <input type="text" placeholder="Benutzername" bind:value={username} class="input" id="username"><br>
        <input type="password" placeholder="Passwort" bind:value={password} class="input" id="password"><br><br>
        <button id="login" class="button" on:click={login}>Anmelden</button>
    </div>
</form>
{/if}