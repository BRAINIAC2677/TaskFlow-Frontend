<script lang="ts">
    // Import any necessary libraries or components
    // Dummy data for overview statistics
    export let title: string;
    let totalTasks = 120;
    let completedTasks = 85;
    let ongoingTasks = 30;
    let overdueTasks = 5;
    let streak = 5;

    let todayTaskDue = 5;
    let todayTaskCompleted = 3;
    let todayTaskOverdue = 2;

    let thisWeekTaskDue = 10;
    let thisWeekTaskCompleted = 5;
    let thisWeekTaskOverdue = 2;

    let thisMonthTaskDue = 20;
    let thisMonthTaskCompleted = 15;
    let thisMonthTaskOverdue = 5;
</script>

<div class="p-4 bg-white rounded shadow">
    <div class="mb-16 text-2xl font-bold text-black">{title}</div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Due Today</p>
            <p class="text-2xl font-bold">{todayTaskDue}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Completed Today</p>
            <p class="text-2xl font-bold">{todayTaskCompleted}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Overdue Today</p>
            <p class="text-2xl font-bold">{todayTaskOverdue}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Due This Week</p>
            <p class="text-2xl font-bold">{thisWeekTaskDue}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Completed This Week</p>
            <p class="text-2xl font-bold">{thisWeekTaskCompleted}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Overdue This Week</p>
            <p class="text-2xl font-bold">{thisWeekTaskOverdue}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Due This Month</p>
            <p class="text-2xl font-bold">{thisMonthTaskDue}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Completed This Month</p>
            <p class="text-2xl font-bold">{thisMonthTaskCompleted}</p>
        </div>

        <div class="p-4 border rounded">
            <p class="text-sm text-gray-600">Task Overdue This Month</p>
            <p class="text-2xl font-bold">{thisMonthTaskOverdue}</p>
        </div>

        <!-- Additional cards for Current Streak and Time Spent on Tasks -->
        <!-- ... -->
    </div>
</div>
