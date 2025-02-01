<script>
  import { user } from '$lib/user.svelte';
</script>

<div>
  {#if user.isLoggedIn()}
    <i class="fa-solid fa-user-circle"></i>
    <p>{user.username}</p>
  {:else}
    <i class="fa-solid fa-arrow-circle-right"></i>
    <p>Login</p>
  {/if}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
