<script lang="ts">
    import Heatmap from "svelte-heatmap";

    export let title: string;
    export let data: any;
    export let startDate: string;
    export let endDate: string;
</script>

<div class="mt-4">
    <div class="mb-16 text-2xl text-black">{title}</div>
    < font-boldHeatmap {data} {startDate} {endDate} />
</div>
