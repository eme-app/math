<script lang="ts">
    import { onMount } from 'svelte';
    import { user, pb } from "./pocketbase";

    let errorCode: String = null

    onMount(async () => {
        try{
            pb.collection("eme_users").getOne($user.id).then((response) => {
                console.log("userdata requested");
                console.log("response status: ");
                console.log(response.status);
            })} catch(error) {
                console.log(error)
                errorCode = "network"
            }
    })
</script>

<body>
    {#if errorCode="network"}
        network error
    {/if}
</body>