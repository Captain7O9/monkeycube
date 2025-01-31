<script>
  import UserAccount from '$lib/components/UserAccount.svelte';
  import Logo from '$lib/components/Logo.svelte';
</script>

<div class="navbar-content constrain-width">
  <a href="/" class="logo justify-left lexend-deca"><Logo /></a>

  <a href="/times" aria-label="times"><i class="fa-solid fa-clock"></i></a>
  <a href="/login" class="login">
    <UserAccount />
  </a>
</div>

<style>
  .navbar-content {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .logo {
    font-size: 2.3em;
    color: var(--text-color);
  }

  .login {
    margin-left: auto;
  }

  a:hover {
    color: var(--text-color);
  }
</style>
