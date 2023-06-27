<script lang="ts">
import Login from "./lib/login.svelte"
import Tasks from "./lib/tasks.svelte"
import { user, pb } from "./lib/pocketbase";
import Slider from "./lib/slider.svelte"
</script>

{#if !$user}
<p id="please-login">Bitte anmelden</p>
{:else}
<Tasks/>
{/if}

<Login/>