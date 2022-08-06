<script>
	import { goto } from '$app/navigation';
	export let Object;
	console.log(Object);

	let isModalOpen = false;

	async function editSession() {
		const res = await fetch('https://localhost:8000/api/sessions/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(Object)
		});
        console.log(res);

		if (res['ok'] == true) {
			isModalOpen = true;
			setTimeout(() => {
				goto('/Console/Sessions');
			}, 3000);
		}
	}
</script>

<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Edit session successful</h3>
		<p class="py-4">You'll be sent back to the sessions page in a while...</p>
	</div>
</div>

<body>
	<div class="py-8">
		<div class="w-1/4 bg-base-100 mx-auto rounded">
			<ul class="menu ">
				<form class="form-control" on:submit|preventDefault={editSession}>
					<li><b>Session creator details</b></li>
					<li>
						<p>
							Creator: {Object.User}
						</p>
					</li>
					<li>
						<p>
							Access permissions: {Object.Door_Permissions}
						</p>
					</li>
					<li>
						<b> Session Details </b>
					</li>
					<li>
						<label class="input-group gap-0">
							<span class="h-12 bg-inherit">Session ID</span>
							<input bind:value={Object.Session_ID} type="text" class="input input-bordered" />
						</label>
					</li>
					<li>
						<label class="input-group gap-0">
							<span class="h-12 bg-inherit">Technician Phone Number</span>
							<input
								bind:value={Object.Technician_Phone_No}
								type="text"
								class="input input-bordered"
							/>
						</label>
					</li>
					<li>
						<b> Technician details </b>
					</li>
					<li>
						<p>
							phone number: {Object.Technician_Phone_No}
						</p>
					</li>
					<button type="submit" href="./" class="btn w-full self-center">Finish Edit</button>
				</form>
			</ul>
		</div>
	</div>
</body>
