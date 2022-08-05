<script context="module">
import {isLoggedIn} from "./Console/stores/authStore";

export function load ({url}) {
	if (browser) {
		if(publicRoutes.includes(url.pathname)) {
			return;
		}
		const auth = getAuth();
		onAuthStateChanged(auth,(user) =>{
			if (user)
			{
				console.log("welcome to the file portal");
				isLoggedIn.update(() => true);
			}
			else
			{
				isLoggedIn.update(() => false);
				goto("/Console/auth/login");
			}
		})
	} 
};
</script>

<script>
import '../app.css';
import Navbar from "$lib/navbar.svelte";
import app from "./Console/firebase"

import {onMount} from "svelte";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {goto} from "$app/navigation";
import { browser } from "$app/env";
import publicRoutes from "$lib/publicRoutes";
</script>

<header />
<Navbar />

<main class="pt-16">
	<slot />
</main>

<footer>

</footer>
