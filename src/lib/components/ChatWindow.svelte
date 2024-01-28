<script lang="ts">
  import { Avatar } from "flowbite-svelte";
  // Messaging
  export let chatMessages = [
    {
      id: 1,
      text: "Hey, have you finished the report? You seem to be putting it off.",
      sender: "TaskFlow",
      timestamp: "10:15 AM",
    },
    {
      id: 2,
      text: "Not yet, I'll upload it by tonight. Actually I'm stuck at a point. Can you help me out? I'm not sure how to proceed.",
      sender: "Asif Azad",
      timestamp: "10:17 AM",
    },
    {
      id: 3,
      text: "Okay, let me know if you need any help.",
      sender: "TaskFlow",
      timestamp: "10:18 AM",
    },
    {
      id: 4,
      text: "Sure, thanks.",
      sender: "Asif Azad",
      timestamp: "10:19 AM",
    },
  ];

  let message_box_class: string =
    "p-3 bg-accent-400 dark:bg-accent-600 text-black dark:text-white rounded-lg rounded-tl-none max-w-xs lg:max-w-md";
  let timestamp_class: string =
    "text-xs text-black font-bold dark:text-white text-right mt-1";

  function send_message() {}
</script>

<div class="flex-1 bg-accent-50 dark:bg-accent-700 p-4">
  <h2 class="text-xl font-semibold text-black dark:text-black mb-4">
    Chat Window
  </h2>
  <div class="space-y-6 mb-6">
    {#each chatMessages as message}
      {#if message.sender === "TaskFlow"}
        <div class="flex gap-4">
          <Avatar src="https://source.unsplash.com/random" />
          <div class="flex space-x-2">
            <div>
              <div class={message_box_class}>
                <p class="text-md font-bold">{message.sender}</p>
                <p class="text-sm">{message.text}</p>
                <p class={timestamp_class}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <div class="flex gap-4 justify-end">
          <div class="flex space-x-2">
            <div>
              <div class={message_box_class}>
                <p class="text-md font-bold">{message.sender}</p>
                <p class="text-sm">{message.text}</p>
                <p class={timestamp_class}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
          <Avatar src="https://source.unsplash.com/random" />
        </div>
      {/if}
    {/each}
  </div>
  <div class="pt-4 text-center">
    <textarea
      class="w-full p-2 text-sm text-black dark:text-gray-300 bg-white dark:bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      rows="2"
      placeholder="Type your message..."
    ></textarea>
    <button
      class="mt-2 w-20 h-10 mx-auto max-w-3px bg-accent-500 hover:bg-accent-700 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
      on:click={send_message}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        viewBox="0 0 512 512"
        ><path
          d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
        /></svg
      >

      Send
    </button>
  </div>
</div>
