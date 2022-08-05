<script>
    import { goto } from "$app/navigation";
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
    
    export let title;

    const auth = getAuth();

    function login()
    {
        let email = document.getElementById("emailInput").value;
        let password = document.getElementById("passInput").value;
        if(title == "Login")
        {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>
            {
                const user = userCredential.user;
                localStorage.setItem("uid", user.uid);
                getIdToken(user).then((token)=>{
                    localStorage.setItem("idToken", token);
                });
                goto("/Console");
            }).catch((error) => {
                console.error(error);
            });
        }
        else
        {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>
            {
                const user = userCredential.user;
                localStorage.setItem("uid", user.uid);
                goto("/");
            }).catch((error) => {
                console.error(error);
            });
        }
    }
</script>

<div class="form-control">
    <form class="flex flex-col gap-4" on:submit|preventDefault={login}>
        <label for="emailInput" class="input-group input-group-vertical w-1/2 mx-auto pt-8">
        <span>Email</span>
        <input type="email" id="emailInput" placeholder="info@site.com" class="input input-bordered" />
        </label>

        <label for="passInput" class="input-group input-group-vertical w-1/2 mx-auto">
        <span>Password</span>
        <input type="password" id="passInput" placeholder="cum and shit" class="input input-bordered" />
        </label>

        <button type="submit" class="input-group input-group-vertical w-1/2 mx-auto btn">Login</button>
    </form>
    
</div>
