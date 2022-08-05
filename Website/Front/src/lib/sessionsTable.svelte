<script>
	import { onMount } from 'svelte';

	export let Command;

    let url = '';
	let result = {};
	let uid = '';

	onMount(async () => {
        console.log(Command);
		uid = localStorage.getItem('idToken');
        console.log(uid);

		if (Command == 'getActive') {
            url = `https://localhost:8000/api/Sessions/getAll?uid=${uid}`;
		} else if (Command == 'getAll') {

		}
        console.log(url);
		await fetch(url)
			.then((response) => response.json())
			.then((data) => (result = data));
		console.log(result);
	});
</script>

<div class="overflow-x-auto w-full pt-8">
	<table class="table w-full">
		<thead>
			<tr>
				<th>Session status</th>
				<th>ID</th>
				<th>Favorite Color</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(result) as [id, { Is_Session_Active, Session_ID}]}
				<tr class="hover">
					<td>
						{#if Is_Session_Active = true}
						Active
                        {:else}
                        Inactive
                        {/if}
					</td>
					<td>
                        {Session_ID}
					</td>
					<td>
						{Is_Session_Active}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
