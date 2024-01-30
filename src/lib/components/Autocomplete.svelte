<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface Suggestion {
    id: number | string;
    name: string;
  }

  export let suggestions: Array<Suggestion> = [];
  export let loading: boolean = false;
  export let searchTerm: string = "";
  let filteredSuggestions: Array<Suggestion> = [];

  const dispatch = createEventDispatcher();

  const makeMatchBold = (string: string, matched_part: string) => {
    let match = matched_part.toLowerCase();
    let matchIndex = string.toLowerCase().indexOf(match);
    if (matchIndex === -1) return string;
    const ret: string =
      string.substring(0, matchIndex) +
      "<strong>" +
      string.substring(matchIndex, matchIndex + match.length) +
      "</strong>" +
      string.substring(matchIndex + match.length);
    return ret;
  };

  const selectSuggestion = (index: number | string, suggestion: string) => {
    searchTerm = suggestion;
    dispatch("select", { index, suggestion });
  };

  $: if (suggestions.length && searchTerm) {
    filteredSuggestions = suggestions
      .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
  } else {
    filteredSuggestions = [];
  }
</script>

<div class="w-full relative">
  <input
    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    placeholder="Type to search..."
    bind:value={searchTerm}
  />
  <div class="absolute w-full mt-1">
    {#if loading}
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="loader"></div>
      </div>
    {:else if filteredSuggestions.length === 0 && searchTerm !== ""}
      <div class="absolute w-full bg-white shadow-lg z-10">
        <div class="cursor-default select-none py-2 px-4 text-gray-700">
          No match found
        </div>
      </div>
    {:else}
      <ul class="absolute w-full bg-white shadow-lg z-10">
        {#each filteredSuggestions as suggestion (suggestion.id)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <li
            class="cursor-default select-none py-2 px-4 hover:bg-gray-100"
            on:click={() => selectSuggestion(suggestion.id, suggestion.name)}
          >
            {@html makeMatchBold(suggestion.name, searchTerm)}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .loader {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 2s linear infinite;
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
