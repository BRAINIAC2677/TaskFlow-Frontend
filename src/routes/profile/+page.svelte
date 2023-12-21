<script lang="ts">
  import user_store from "$lib/stores/user_store";

  let current_password: string = "";
  let new_password: string = "";
  let confirm_new_password: string = "";

  // Function to handle form submission
  const saveChanges = () => {
    // Implement the logic to save changes
  };
</script>

<div class="container mx-auto p-8 bg-white shadow-lg rounded-lg">
  <form class="space-y-8 divide-y divide-gray-200">
    <!-- Profile section -->
    <div class="flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src="https://unsplash.it/200/200"
            alt="Profile Picture"
            class="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <div class="text-xl font-bold">
              {$user_store.first_name + " " + $user_store.last_name}
            </div>
          </div>
        </div>
        <div class="flex">
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >Upload New Photo</button
          >
          <button
            type="button"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out ml-2"
            >Delete</button
          >
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="pt-8 grid grid-cols-2 gap-8">
      <div>
        <label for="first-name" class="text-sm font-medium text-gray-700"
          >First Name</label
        >
        <input
          id="first-name"
          type="text"
          placeholder="First Name"
          bind:value={$user_store.first_name}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label for="last-name" class="text-sm font-medium text-gray-700"
          >Last Name</label
        >
        <input
          id="last-name"
          type="text"
          placeholder="Last Name"
          bind:value={$user_store.last_name}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label for="phone" class="text-sm font-medium text-gray-700"
          >Phone Number</label
        >
        <input
          id="phone"
          type="tel"
          placeholder="Phone Number"
          bind:value={$user_store.phone_number}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label for="email" class="text-sm font-medium text-gray-700"
          >Email Address</label
        >
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          bind:value={$user_store.email}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
    </div>

    <!-- Password section -->
    <div class="pt-8 grid grid-cols-3 gap-8">
      <div>
        <label for="current-password" class="text-sm font-medium text-gray-700"
          >Current Password</label
        >
        <input
          id="current-password"
          type="password"
          placeholder="Current Password"
          bind:value={current_password}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label for="new-password" class="text-sm font-medium text-gray-700"
          >New Password</label
        >
        <input
          id="new-password"
          type="password"
          placeholder="New Password"
          bind:value={new_password}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label
          for="confirm-new-password"
          class="text-sm font-medium text-gray-700">Confirm New Password</label
        >
        <input
          id="confirm-new-password"
          type="password"
          placeholder="Confirm New Password"
          bind:value={confirm_new_password}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
    </div>

    <!-- Action buttons -->
    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="button"
          class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >Cancel</button
        >
        <button
          type="submit"
          on:click|preventDefault={saveChanges}
          class="ml-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >Save Changes</button
        >
      </div>
    </div>
  </form>
</div>
