<script lang="ts">
import Login from "./lib/login.svelte"
import Tasks from "./lib/tasks.svelte"
import { user, pb } from "./lib/pocketbase";
import Slider from "./lib/slider.svelte"
</script>

<Login/>

{#if $user}
    <Tasks/>
    <Slider/>
{:else}
    <p>Bitte anmelden</p>
{/if}