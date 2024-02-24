<script lang="ts">
  import server_url from "$lib/stores/server_store";
  import type { Notification } from "$lib/interfaces/notification";
  import { processNotificationMessage } from "$lib/interfaces/notification";
  import { onMount } from "svelte";

  async function fetchNotifications() {
    const token = localStorage.getItem("access_token") || "";
    const header = new Headers({
      Authorization: token,
      "Content-Type": "application/json",
    });

    const request = {
      method: "GET",
      headers: header,
    };

    try {
      const url = new URL($server_url + "/notification/retrieve");
      url.searchParams.set("count", "100");
      url.searchParams.set("offset", "0");
      const response = await fetch(url.toString(), request);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.log("Error fetching notifications");
      }
    } catch (error) {
      console.log("Error fetching notifications");
    }
  }

  let notifications: Array<Notification> = [];

  onMount(async () => {
    try {
      console.log("Fetching notifications");
      const data = await fetchNotifications();
      notifications = data;
      notifications.forEach(
        (n) => (n.body = processNotificationMessage(n.body))
      );
      console.log(notifications);
    } catch (error) {
      console.log("Error fetching notifications");
    }
  });

  // Function to mark all notifications as read
  function markAllAsRead() {
    notifications = notifications.map((n) => ({ ...n, read: true }));
  }

  // Function to delete a notification
  function deleteNotification(notificationId: any) {
    notifications = notifications.filter((n) => n.id !== notificationId);
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
      <div
        class="flex items-center justify-between bg-white hover:bg-gray-100 p-4 rounded relative"
      >
        <div class="flex-1 ml-4">
          <p>{@html notification.body}</p>
        </div>
        {#if !notification.read}
          <span
            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1"
          >
            New
          </span>
        {/if}
        <button
          class="absolute top-2 right-2"
          on:click={() => deleteNotification(notification.id)}
        >
          &#x2715;
        </button>
      </div>
    {/each}
  </div>
</div>
