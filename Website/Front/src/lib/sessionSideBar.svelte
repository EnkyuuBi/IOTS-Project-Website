<script>
	import SessionsTable from '$lib/sessionsTable.svelte';
	import { page } from '$app/stores';

	$: currentRoute = $page.url.pathname;
	export let Command;
</script>

<div>
	<div class="drawer drawer-mobile">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center">
			<!-- Page content here -->
			<div class="flex-none lg:hidden" style="align-items:left">
				<label for="my-drawer-2" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
			</div>
			<div class="container mx-auto w-8/12">
				<h1 class="pt-8">Your active sessions</h1>

				<SessionsTable {Command} />
			</div>
		</div>

		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
				<!-- Sidebar content here -->
				<li>
					<a class:active={currentRoute === '/Console/Sessions'} href="Sessions">Active Sessions</a>
				</li>
				<li>
					<a class:active={currentRoute === '/Console/Sessions/All'} href="Sessions/All"
						>All Sessions</a
					>
				</li>
				<li>
					<a class:active={currentRoute === '/Console/Sessions/History'} href="Sessions/History"
						>Past Sessions</a
					>
				</li>
				<div class="flex flex-col w-full border-opacity-50">
					<div class="divider" />
				</div>

				<li>
					<a class:active={currentRoute === '/Console/Sessions/New'} href="Sessions/New"
						>Create Session</a
					>
				</li>
			</ul>
		</div>
	</div>
</div>
