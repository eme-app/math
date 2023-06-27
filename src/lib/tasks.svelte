<script lang="ts">
    import { onMount } from 'svelte';
    import { user, pb } from "./pocketbase";

    let tasks = []
    let current_task = []
    let one: number
    let two: number
    let result: any
    let page: number = 0

    function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    
    onMount(async () => {
        pb.collection("eme_user_config").getOne($user.userconfig).then((data) => {
            result = data
            for (let id = 0; id < 500; id++) {
                one = getRandomInt(data.fact_one_default_min, data.fact_one_default_max)
                two = getRandomInt(data.fact_two_default_min, data.fact_two_default_max)

                current_task = [one, two, one*two, id]
                tasks.push(current_task)
            }
        })
    })

    function next() {
        page++
    }

    function previous() {
        if (page > 0) {
            page--
        }
    }

</script>
<div id="form">
{#if result !== undefined}
    {#each tasks as task}
        {#if page === task[3]}
            <p class="task">{task[0]} x {task[1]} = {task[2]} (id: {task[3]})</p>
        {/if}
    {/each}
    <br><br><br>
    <button class="button-two" on:click={previous}>	&lt</button>
    <button class="button-two" on:click={next}>&gt</button>
{:else}
    <p>Bitte warten...</p>
{/if}
</div>