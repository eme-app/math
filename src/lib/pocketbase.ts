import PocketBase from 'pocketbase';
import { get, writable } from 'svelte/store';

export const pb = new PocketBase("https://pocketbase.emilemilchen.de/")
export const user = writable(pb.authStore.model)



pb.authStore.onChange((auth) => {
    console.log('state changed:', auth);
    user.set(pb.authStore.model)
})