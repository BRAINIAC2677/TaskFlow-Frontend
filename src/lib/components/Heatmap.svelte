<script lang="ts">
  import Chart from "./Chart.svelte";
  import { onMount } from "svelte";
  import server_url from "$lib/stores/server_store";
  import theme_store from "$lib/stores/theme_store";

  let loading = false;
  export let options: any;

  let data: any;

  onMount(async () => {});

  $: if (data) {
    options = {
      theme: {
        mode: $theme_store.darkMode ? "dark" : "light",
      },
      chart: {
        type: "pie",
        background: "transparent",
      },
      series: data.series,
      labels: data.labels,
    };
  }
</script>

{#if loading}
  <div class="spinner"></div>
{:else}
  {#key $theme_store.darkMode}
    <Chart bind:options />
  {/key}
{/if}

<style>
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-left-color: #09f;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin: 50px auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
