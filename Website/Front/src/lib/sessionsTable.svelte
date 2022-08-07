<script>
	import { onMount } from 'svelte';
	import { getAuth, getIdToken } from 'firebase/auth';

	const auth = getAuth();
	export let Command;

	let url = '';
	let result = {};

	onMount(async () => {
		await auth.onAuthStateChanged(async (user) => {
			const uid = await user?.getIdToken();
			if (Command == 'getActive') {
				url = `https://localhost:8000/api/Sessions/getAll?uid=${uid}`;
			} else if (Command == 'getAll') {
			}
			await fetch(url)
				.then((response) => response.json())
				.then((data) => (result = data));
		});
	});
</script>

<div class="overflow-x-auto w-full pt-8">
	<table class="table w-full">
		<thead>
			<tr>
				<th>ID</th>
				<th>Session status</th>
				<th>Favorite Color</th>
				<th>Details</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(result) as [id, { Is_Session_Active, Session_ID }]}
				<tr class="hover">
					<td>
						{Session_ID}
					</td>
					<td>
						{#if (Is_Session_Active = true)}
							Active
						{:else}
							Inactive
						{/if}
					</td>
					<td>
						{Is_Session_Active}
					</td>
					<td>
						<a class="btn btn-square" href="./Sessions/{Session_ID}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/></svg
							>
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
