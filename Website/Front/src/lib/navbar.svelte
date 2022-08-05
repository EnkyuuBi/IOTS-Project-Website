<script>
    import {page} from "$app/stores";
    import {isLoggedIn} from "../routes/Console/stores/authStore";
    import LogoutButton from "$lib/logoutButton.svelte";
    $:currentRoute = $page.url.pathname;
</script>

<style>

</style>

<div class ="navbar bg-base-100 fixed z-50">
    <a class="btn btn-ghost normal-case text-xl" href="/">SmartLock</a>

    <ul class="menu menu-horizontal p-0 flex-1">
        {#if $isLoggedIn}
        <li><a class:active={currentRoute === "/Console/Sessions"} href="/Console/Sessions">Sessions</a></li>
        <li><a class:active={currentRoute === "/Console/Settings"} href="/Console/Settings">Settings</a></li>
        <li><a class:active={currentRoute === "/work"} href="https://google.com">Firefox</a></li>
        {/if}
    </ul>

    {#if !$isLoggedIn}
    <a class="btn btn-square btn-ghost flex-none" href="/Console/auth/login">
        login
    </a>
    {/if}
    {#if $isLoggedIn}
        <LogoutButton />
    {/if}
</div>