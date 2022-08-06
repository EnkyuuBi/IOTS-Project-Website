<script>
    import {page} from "$app/stores";
import EditSession from "$lib/editSession.svelte";
    
    import ViewSession from "$lib/viewSession.svelte";

    var currentRoute = $page.params.id;
    let result = {};
    fetch(`https://localhost:8000/api/sessions/get?id=${currentRoute}`)
    .then(response => response.json())
    .then(data => result = data);
</script>

<div>
	<EditSession Object={result}/>
</div>
