<script>
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';
	var newSession = {};
	var User = '';
	var Username = '';
	var Technician_Phone_No = '';

	let isModalOpen = false;
	async function createSession() {
		newSession['UserID'] = localStorage.getItem('idToken');
        newSession['Status'] = "Ready"

		console.log(newSession);

		const res = await fetch('https://localhost:8000/api/sessions/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newSession)
		});

		console.log(res);
		if (res['ok'] == true) {
            isModalOpen = true;
            setTimeout (() => {
                goto('/Console/Sessions');
            }, 3000);
		}
	}

	let uid = '';
	onMount(async () => {
		uid = localStorage.getItem('uid');
	});
</script>

<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Session create successful</h3>
		<p class="py-4">
			You'll be sent back to the sessions page in a while...
		</p>
	</div>
</div>

<body>
	<div class="py-8">
		<div class="w-1/4 bg-base-100 mx-auto rounded">
			<ul class="menu ">
				<form class="form-control" on:submit|preventDefault={createSession}>
					<li><b>Session creator details</b></li>
					<li>
						<p>
							Creator: {uid}
						</p>
					</li>
					<li>
						<label class="input-group gap-0">
							<span class="h-12 bg-inherit">Your Name</span>
							<input bind:value={Username} type="text" class="input input-bordered" />
						</label>
					</li>
					<li>
						<label class="input-group gap-0">
							<span class="h-12 bg-inherit">Access Permissions</span>
							<input bind:value={Username} type="text" class="input input-bordered" />
						</label>
					</li>
					<li>
						<b> Session Details </b>
					</li>
					<li>
						<label class="input-group gap-0">
							<span class="h-12 bg-inherit">Technician Phone Number</span>
							<input bind:value={Technician_Phone_No} type="text" class="input input-bordered" />
						</label>
					</li>
					<button type="submit" href="./" class="btn w-full self-center">Create session</button>
				</form>
			</ul>
		</div>
	</div>
</body>
