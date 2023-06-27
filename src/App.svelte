<script lang="ts">
import Login from "./lib/login.svelte"
import Tasks from "./lib/tasks.svelte"
import { user, pb } from "./lib/pocketbase";
import Startpage from "./lib/startpage.svelte"

let settings: Array<any> = [false]
</script>

{#if !$user}
<p id="please-login">Bitte anmelden</p>
{:else}

{#if settings[0] === true}
<Tasks {settings}/>
{:else}
<Startpage bind:settings={settings}/>
{/if}
{/if}

<Login/>