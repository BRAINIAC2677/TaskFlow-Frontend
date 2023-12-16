<script lang="ts">
  import { dummy_boards } from "$lib/dummy_data/boards";

  let progress = 72; // Your progress value
  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = ((100 - progress) / 100) * circumference; // Offset for stroke-dasharray
</script>

<div class="min-h-screen bg-gray-100 p-8">
  <header class="mb-6 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input type="search" class="input-search" placeholder="Search..." />
        <!-- Add search icon -->
      </div>
      <div class="profile-menu">
        <!-- Add profile details -->
      </div>
    </div>
  </header>

  <div class="main-content grid grid-cols-12 gap-4">
    <section class="col-span-12">
      <!-- Overview Section -->
      <div
        class="overview-section mb-4 grid grid-cols-1 gap-4 rounded-lg bg-white p-4 md:grid-cols-4"
      >
        <!-- Task Completion Rate Card -->
        <div class="card bg-purple-100 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg">Task Completion Rate</h3>
          <p class="text-2xl font-bold">200/300 Tasks</p>
          <p class="text-green-600">67% of tasks completed</p>
        </div>

        <!-- Active Tasks Card -->
        <div class="card bg-blue-100 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg">Active Boards</h3>
          <p class="text-2xl font-bold">10</p>
          <p class="text-green-600">boards currently active</p>
        </div>

        <!-- Upcoming Deadlines Card -->
        <div class="card bg-green-100 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg">Upcoming Deadlines</h3>
          <p class="text-2xl font-bold">8</p>
          <p class="text-red-600">Tasks due this week</p>
        </div>

        <!-- Personal Goal Card -->
        <div class="card bg-yellow-100 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg">Daily Goals Progress</h3>
          <p class="text-2xl font-bold">6/10 Tasks</p>
          <p class="text-green-600">60% of daily goal completed</p>
        </div>
      </div>

      <div class="details-section bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Summary of Boards</h2>
          <div class="flex space-x-2">
            <!-- Filter dropdowns or sorting controls can be added here -->
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Board</th
                >
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Owner</th
                >
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Due Date</th
                >
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Status</th
                >
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Progress</th
                >
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each dummy_boards as board}
                <tr>
                  <td class="px-4 py-4 whitespace-nowrap">{board.title}</td>
                  <td class="px-4 py-4 whitespace-nowrap">{board.owner_name}</td
                  >
                  <td class="px-4 py-4 whitespace-nowrap"
                    >{new Date(board.due_date).toLocaleDateString()}</td
                  >
                  <td class="px-4 py-4 whitespace-nowrap">
                    {#if board.status === "In Progress"}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                      >
                        In Progress
                      </span>
                    {:else if board.status === "Completed"}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        Completed
                      </span>
                    {:else if board.status === "Not Started"}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                      >
                        Not Started
                      </span>
                    {/if}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    {#if board.progress === 0}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-red-800"
                        style="width: {board.progress}%"
                      >
                        {board.progress}%
                      </span>
                    {:else if board.progress < 20}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                        style="width: {board.progress}%"
                      >
                        {board.progress}%
                      </span>
                    {:else if board.progress < 50}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                        style="width: {board.progress}%"
                      >
                        {board.progress}%
                      </span>
                    {:else if board.progress < 80}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                        style="width: {board.progress}%"
                      >
                        {board.progress}%
                      </span>
                    {:else if board.progress < 100}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                        style="width: {board.progress}%"
                      >
                        {board.progress}%
                      </span>
                    {:else}
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800"
                        style="width: {board.progress}%"
                      >
                        {board.progress}%
                      </span>
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</div>
