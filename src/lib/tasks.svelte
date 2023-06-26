<script lang="ts">
    import { user, pb } from "./pocketbase";

    let tasks = []
    let task: any
    let config: any

    pb.collection("eme_user_config").getOne($user.userconfig).then((data) => {
        config = data
    })

    //let fact_one_default_max = 
    //let fact_one_default_min = 

    for (let id = 0; id < 100; id++) {
        tasks.push(id)
    }
</script>

{#each tasks as task}
<h1>{task}</h1>
{/each}