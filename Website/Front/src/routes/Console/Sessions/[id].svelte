<script>
    import {page} from "$app/stores";
    $:currentRoute = $page.params.id;
    
    let result = {};
    fetch("https://localhost:8000/api/sessions/get?id=106169")
    .then(response => response.json())
    .then(data => result = data);
</script>

<div>
	{result}
</div>
