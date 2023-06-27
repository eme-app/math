<script lang="ts">
    import { onMount } from 'svelte';
    import { user, pb } from "./pocketbase";

    export let settings: Array<any> = [false]

    let f1min, f1max, f2min, f2max: number
    let custom: boolean = false
    let userdata: any

    function go() {
        if (custom) {
            settings = [true, custom, f1min, f1max, f2min, f2max]
        } else {
            settings = [true, custom, null, null, null, null]
        }
    }

    onMount(async () => {
        pb.collection("eme_user_config").getOne($user.userconfig, { '$autoCancel': false}).then((data) => {
            userdata = data
            f1min = userdata.fact_one_default_min
            f1max = userdata.fact_one_default_max
            f2min = userdata.fact_two_default_min
            f2max = userdata.fact_two_default_max
        })
    })
</script>
<center>
<div id="toggle-custom" class="switch">
    <input type="checkbox" bind:checked={custom} id="custom" name="custom" value="custom" class="switch">
    <label for="custom" id="custom-label" class="switch">Toggle</label>
</div>
</center>
{#if custom === true}
    <div id="sliders" class="form">
        <input type="range" id="f1min" name="f1min" bind:value={f1min} min="{userdata.fact_one_abs_min}" max="{userdata.fact_one_abs_max}"><label for="f1min">Faktor 1 Minimum: {f1min}</label><br><br>
        <input type="range" id="f1max" name="f1max" bind:value={f1max} min="{userdata.fact_one_abs_min}" max="{userdata.fact_one_abs_max}"><label for="f1max">Faktor 1 Maximum: {f1max}</label><br><br>

        <input type="range" id="f2min" name="f2min" bind:value={f2min} min="{userdata.fact_two_abs_min}" max="{userdata.fact_two_abs_max}"><label for="f2min">Faktor 2 Minimum: {f2min}</label><br><br>
        <input type="range" id="f2max" name="f2max" bind:value={f2max} min="{userdata.fact_two_abs_min}" max="{userdata.fact_two_abs_max}"><label for="f2max">Faktor 2 Maximum: {f2max}</label><br><br>
    </div>
{/if}

<div id="go-button" class="form">
    <button on:click={go} id="go" class="button">Bestätigen & starten</button>
</div>