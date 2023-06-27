<script lang="ts">
    import { onMount } from 'svelte';
    import { user, pb } from "./pocketbase";
    import { get, writable } from 'svelte/store';
    import { end_hydrating } from 'svelte/internal';

    export let settings: Array<any> = [false]
    

    let current_task = []
    let page: number = 1
    let userconfig: any
    let one, two: number
    let inputed_result, clear: any
    let inputed_int: Number
    let note: string = ""
    let tries: number = 0
    let data: any
    let wrong_answers: Array<any> = []

    function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    
    onMount(async () => {
        pb.collection("eme_user_config").getOne($user.userconfig, { expand: 'mistake_handling_config', '$autoCancel': false}).then((data) => {
            userconfig = data
            current_task = createTask()
            console.log("userconfig:");
            console.log(userconfig);
            console.log("mistake_handling_config:");
            console.log(userconfig.expand.mistake_handling_config);
            console.log("user:");
            console.log($user);
            if (settings[1] === false) {
                settings[2] = userconfig.fact_one_default_min
                settings[3] = userconfig.fact_one_default_max
                settings[4] = userconfig.fact_two_default_min
                settings[5] = userconfig.fact_two_default_max
                console.log("no custom values");
            }
            console.log(settings);
            
            if (userconfig.mistake_handling_config === undefined) {
                console.log("ERROR: no mistake_handling_config found in userconfig");                
            }
            createGame()
        })  
    })

    function createTask() {
        one = getRandomInt(settings[2],settings[3])
        two = getRandomInt(settings[4],settings[5])
        return [one, two, one*two]
    }

    function createGame() {
        data = {
            "player": [
                $user.id
            ],
            "factor1min": settings[2],
            "factor1max": settings[3],
            "factor2min": settings[4],
            "factor2max": settings[5]
        };
        pb.collection('eme_games').create(data);
        console.log("created game:");
        console.log(data);
        //TODO write game start time to database (update)
    }

    function advance() {
        clear.value = ""
        current_task = createTask()
        note = ""
        console.log("advanced");        
        console.log("current_task="+current_task);
        tries = 0;
        inputed_result = clear.value
        page++
    }

    function next() {
        try {
            inputed_int = parseInt(inputed_result)
        } catch(error) {
            alert("Fehler")
            console.log(error);
        }

        if (inputed_int === current_task[2]) {
            advance()
        } else {
            console.log("wrong:");
            console.log("intput_as_int="+inputed_int);
            console.log("intput="+inputed_result);
            if (inputed_result === undefined || inputed_result === "" || Number.isNaN(inputed_int) || inputed_int === undefined) {
                if (userconfig.expand.mistake_handling_config.allow_empty_results === false) {
                    note = "Bitte Ergebnis eingeben"
                } else {
                    advance()
                }
            } else {
                if (userconfig.expand.mistake_handling_config.retries <= tries) {
                    advance()
                } else {
                    tries++
                }
                // TODO add wrong answer to database (create)
                // TODO add wrong answer to wrong_answers array
                // TODO more mistake handling
            }
        }
    }

    function end() {
        console.log("end called");
        // TODO write game end time to database (update)
        // TODO make page reload
    }

    const onInput = (event) => {
        if (event.key === 'Enter') {
            next()
        }
	};

    function exit() {
            if (page === 1) {
                if (confirm("Nach "+page+" Aufgabe beenden?")) {
                    end()
                }
            } else {
                if (confirm("Nach "+page+" Aufgaben beenden?")) {
                    end()
                }
            }
        }
    
</script>
<div id="form" class="form">
{#if userconfig !== undefined}
    <!-- <form on:submit|preventDefault> -->
        <p class="task" id="task">{current_task[0]} x {current_task[1]} =</p>
        <input type="text" placeholder="Ergebnis" id="result" class="input-two" bind:value={inputed_result} bind:this={clear} on:keydown={onInput}>
        <br>
        <p id="note" class="default-p">{note}</p>
        <br><br><br>
        {#if userconfig.showexitbuttonaftertasknum < page}
            <button class="button-two" on:click={exit}>beenden</button>            
        {/if}
        <button class="button-two" on:click={next}>&gt</button>
        {#if userconfig.show_current_task_number}
            <div id="note"><p id="page">Aufgabe {page}</p></div>
        {/if}
    <!-- </form> -->
{:else}
<!--
    <p id="wait">Bitte warten...</p>
-->
{/if}
</div>