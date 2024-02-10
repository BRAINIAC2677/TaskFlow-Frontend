<script>
    let notifications = [
      { id: 1, user: 'John Doe', message: 'liked your post.', profilePic: 'https://via.placeholder.com/50', link: '#', read: false },
      { id: 2, user: 'Jane Smith', message: 'commented on your photo.', profilePic: 'https://via.placeholder.com/50', link: '#', read: true },
      // Add more notifications as needed
    ];
  
    const markAllAsRead = () => {
      notifications = notifications.map(notification => ({ ...notification, read: true }));
    };
  </script>
  
  <div class="min-h-screen flex justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div class="w-full max-w-md">
      <div class="mb-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
        <button
          class="text-sm font-semibold py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          on:click={markAllAsRead}>
          Mark all as read
        </button>
      </div>
      <div class="space-y-2">
        {#each notifications as notification (notification.id)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            on:click={() => notification.read = true}>
            <img class="w-10 h-10 rounded-full mr-3" src={notification.profilePic} alt="{notification.user}">
            <div class="flex-1">
              <a href={notification.link} class="{notification.read ? 'font-normal' : 'font-bold'} text-sm dark:text-white">{notification.user}</a>
              <span class="{notification.read ? 'font-normal' : 'font-bold'} text-sm dark:text-gray-300"> {notification.message}</span>
            </div>
            {#if !notification.read}
              <div class="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                New
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    /* Additional custom styles if needed */
  </style>
  