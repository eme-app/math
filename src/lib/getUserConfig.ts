import { onMount } from 'svelte';
import { user, pb } from "./pocketbase";


onMount(async () => {
    pb.collection("eme_user_config").getOne(pb.authStore.model.userconfig, { expand: 'mistake_handling_config', '$autoCancel': false}).then((data) => {
        
    })
})