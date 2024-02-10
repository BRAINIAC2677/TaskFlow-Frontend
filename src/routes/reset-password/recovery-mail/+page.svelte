<script lang="ts">
  import server_url from "$lib/stores/server_store";
  let email = "";

  async function requestPasswordReset() {
    const response = await fetch($server_url + "/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("Password reset link has been sent to your email");
    } else {
      alert("Failed to send password reset link");
    }
  }
</script>

<svelte:head>
  <title>Recovery Mail</title>
</svelte:head>

<div
  class="flex justify-center items-center min-h-screen bg-accent-50 dark:bg-gray-700"
>
  <form
    on:submit|preventDefault={requestPasswordReset}
    class="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow"
  >
    <h2 class="text-xl font-semibold text-gray-900">Password Reset</h2>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email:</label
      >
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Send Reset Link
    </button>
  </form>
</div>
