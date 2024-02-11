<script lang="ts">
  // Import the Tailwind CSS classes
  import 'tailwindcss/tailwind.css';

  // Sample data for notifications
  let notifications = [
    { id: 1, userName: 'Jane Doe', action: 'liked your post', message: 'Awesome work on your recent project!', userImage: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1707636838~exp=1707637438~hmac=597556e08509858548235207ca049202317db8d6d35338f1cd8e04f82404d2e9', read: false },
    { id: 2, userName: 'John Smith', action: 'commented on your picture', message: 'Nice shot!', userImage: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1707636838~exp=1707637438~hmac=597556e08509858548235207ca049202317db8d6d35338f1cd8e04f82404d2e9', read: true },
    { id: 3, userName: 'Alice Johnson', action: 'started following you', message: 'very good', userImage: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1707636838~exp=1707637438~hmac=597556e08509858548235207ca049202317db8d6d35338f1cd8e04f82404d2e9', read: false },
    // ... more demo notifications
  ];

  // Function to mark all notifications as read
  function markAllAsRead() {
    notifications = notifications.map(n => ({ ...n, read: true }));
  }

  // Function to delete a notification
  function deleteNotification(notificationId:any) {
    notifications = notifications.filter(n => n.id !== notificationId);
  }

  // Function to delete all notifications
  function deleteAllNotifications() {
    notifications = [];
  }
</script>

<div class="container mx-auto p-6">
  <div class="flex justify-between items-center mb-4">
    <button
      class="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
      on:click={markAllAsRead}
    >
      Mark all as read
    </button>
    <button
      class="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded"
      on:click={deleteAllNotifications}
    >
      Delete all
    </button>
  </div>

  <div class="space-y-4">
    {#each notifications as notification}
      <div class="flex items-center justify-between bg-white hover:bg-gray-100 p-4 rounded relative">
        <img src={notification.userImage} alt="Profile" class="w-10 h-10 rounded-full">
        <div class="flex-1 ml-4">
          <p class={`font-semibold ${!notification.read ? 'font-bold' : ''}`}>
            <a href="/user/{notification.userName}" class="hover:underline">{notification.userName}</a> {notification.action}
          </p>
          <p>{notification.message}</p>
        </div>
        {#if !notification.read}
          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1">
            New
          </span>
        {/if}
        <button
          class="absolute top-2 right-2"
          on:click={() => deleteNotification(notification.id)}
        >
        
          &#x2715;
        </button>
        <!-- Expand button logic to be implemented -->
        <!-- <button class="absolute bottom-2 right-2">...</button> -->
      </div>
    {/each}
  </div>
</div>
