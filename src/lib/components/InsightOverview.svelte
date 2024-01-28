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

    let title_class: string =
        "text-sm text-gray-600 dark:text-white text-center";
    let value_class: string = "text-2xl font-bold text-center";
    let wrapper_class: string =
        "p-4 rounded shadow-xl bg-accent-50 dark:bg-accent-600 border border-accent-200 dark:border-accent-700";
</script>

<div class="p-4 rounded shadow-xl bg-accent-200 dark:bg-accent-700">
    <div
        class="mb-16 text-2xl font-bold text-center text-black dark:text-white"
    >
        {title}
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class={wrapper_class}>
            <p class={title_class}>Task Due Today</p>
            <p class={value_class}>{todayTaskDue}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Completed Today</p>
            <p class={value_class}>{todayTaskCompleted}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Overdue Today</p>
            <p class={value_class}>{todayTaskOverdue}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Due This Week</p>
            <p class={value_class}>{thisWeekTaskDue}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Completed This Week</p>
            <p class={value_class}>{thisWeekTaskCompleted}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Overdue This Week</p>
            <p class={value_class}>{thisWeekTaskOverdue}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Due This Month</p>
            <p class={value_class}>{thisMonthTaskDue}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Completed This Month</p>
            <p class={value_class}>{thisMonthTaskCompleted}</p>
        </div>

        <div class={wrapper_class}>
            <p class={title_class}>Task Overdue This Month</p>
            <p class={value_class}>{thisMonthTaskOverdue}</p>
        </div>

        <!-- Additional cards for Current Streak and Time Spent on Tasks -->
        <!-- ... -->
    </div>
</div>
