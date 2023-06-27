<script lang="ts">
export let settings: Array<any> = [false]

function go() {
    settings = [true]
}
</script>

<button on:click={go}>go on</button>