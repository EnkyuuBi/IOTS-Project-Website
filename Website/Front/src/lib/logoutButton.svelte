<script>
import {goto} from "$app/navigation";
import {getAuth, signOut} from "firebase/auth";

const auth = getAuth();

function logout()
{
    signOut(auth).then(() =>
    {
        localStorage.removeItem("uid");
        goto("/Console/auth/login");
    })
    .catch((error) => {
        console.error(error);
    });
}
</script>

<a class="btn btn-ghost normal-case text-xl" href="../" on:click|preventDefault={logout}>Logout</a>