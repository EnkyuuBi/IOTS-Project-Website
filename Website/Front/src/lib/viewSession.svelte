<script>
	export let Object;
	console.log(Object);
</script>

<div class="py-8">
	<div class="w-1/4 bg-base-100 mx-auto rounded">
		<ul class="menu ">
			<li><b>Session creator details</b></li>
			<li><p>Creator: {Object.User}</p></li>
			<li><p>Access permissions: {Object.Door_Permissions}</p></li>
			<li><b>Session Details</b></li>
			<li><p>Status: {Object.Is_Session_Active}</p></li>
			<li><b>Technician details</b></li>
			<li><p>phone number: {Object.Technician_Phone_No}</p></li>
		</ul>
		<div class="btn-group">
			<a href="./" class="btn w-1/2 flex-auto">Return to Sessions</a>
			<a href="./edit/{Object.Session_ID}" class="btn w-1/2 flex-auto">Edit Session</a>
		</div>
	</div>
</div>
