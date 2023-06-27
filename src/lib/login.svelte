<script lang="ts">
    import { user, pb } from "./pocketbase";

    let username
    let password
    let errormessage: String = ""

    async function login() {
        try {
        await pb.collection('eme_users').authWithPassword(username,password)
        } catch(error) {
            console.log(error);
            errormessage = "ungültige Anmeldedaten"
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
<button id="logout" on:click={logout}>angemeldet als {$user.username}<br><a id="logout-logout">abmelden</a></button>
{:else}
<form on:submit|preventDefault>
    <div id="form" class="form">
        <input type="text" placeholder="Benutzername" bind:value={username} class="input" id="username"><br>
        <input type="password" placeholder="Passwort" bind:value={password} class="input" id="password"><br><br>
        <button id="login" class="button" on:click={login}>Anmelden</button>
        <br><br><br>
        <p id="errormessage" class="default-p">{errormessage}</p>
    </div>
</form>
{/if}