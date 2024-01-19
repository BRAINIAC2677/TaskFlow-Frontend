<script lang="ts">
  import { dummy_boards } from "$lib/dummy_data/boards";
  import BoardListView from "$lib/components/BoardListView.svelte";
  import DashboardOverview from "$lib/components/DashBoardOverview.svelte";
  import {
    InfoCircleSolid,
    PlusOutline,
    CalendarEditSolid,
  } from "flowbite-svelte-icons";
  import {
    Drawer,
    Button,
    CloseButton,
    Label,
    Input,
    Textarea,
  } from "flowbite-svelte";

  import { sineIn } from "svelte/easing";
  import ScrollableUserList from "$lib/components/ScrollableUserList.svelte";

  let hidden = true;
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn,
  };

  interface UserMinimalForm {
    id: string;
    user_name: string;
    full_name: string;
    img_url: string;
  }

  let search_term = "";
  let dummy_users: UserMinimalForm[] = [
    {
      id: "1",
      user_name: "john_doe",
      full_name: "John Doe",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "2",
      user_name: "jane_smith",
      full_name: "Jane Smith",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "3",
      user_name: "bob_johnson",
      full_name: "Bob Johnson",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "4",
      user_name: "alice_brown",
      full_name: "Alice Brown",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "5",
      user_name: "charlie_davis",
      full_name: "Charlie Davis",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "6",
      user_name: "emma_white",
      full_name: "Emma White",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "7",
      user_name: "frank_wilson",
      full_name: "Frank Wilson",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "8",
      user_name: "grace_miller",
      full_name: "Grace Miller",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "9",
      user_name: "henry_taylor",
      full_name: "Henry Taylor",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "10",
      user_name: "isabel_moore",
      full_name: "Isabel Moore",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "11",
      user_name: "jack_harris",
      full_name: "Jack Harris",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "12",
      user_name: "kelly_thompson",
      full_name: "Kelly Thompson",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "13",
      user_name: "liam_clark",
      full_name: "Liam Clark",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "14",
      user_name: "nora_lewis",
      full_name: "Nora Lewis",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
    {
      id: "15",
      user_name: "oliver_turner",
      full_name: "Oliver Turner",
      img_url:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80",
    },
  ];
  let selected_users: UserMinimalForm[] = [
    dummy_users[0],
    dummy_users[1],
    dummy_users[2],
    dummy_users[3],
    dummy_users[4],
    dummy_users[5],
  ];
  let suggested_users: UserMinimalForm[] = [];

  $: {
    if (search_term.length > 0) {
      suggested_users = dummy_users.filter(
        (user) =>
          user.user_name.includes(search_term) &&
          !selected_users.some((selected_user) => selected_user.id === user.id)
      );
    } else {
      suggested_users = [];
    }
  }

  const makeMatchBold = (string: string, matched_part: string) => {
    let match = matched_part.toLowerCase();
    let matchIndex = string.toLowerCase().indexOf(match);
    if (matchIndex === -1) return string;
    const ret: string =
      string.substring(0, matchIndex) +
      "<b>" +
      string.substring(matchIndex, matchIndex + match.length) +
      "</b>" +
      string.substring(matchIndex + match.length);
    return ret;
  };
</script>

<div class="min-h-screen bg-gray-100 p-8">
  <header class="mb-6 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input type="search" class="input-search" placeholder="Search..." />
      </div>
      <div class="profile-menu"></div>
    </div>
  </header>

  <div class="main-content grid grid-cols-12 gap-4">
    <section class="col-span-12">
      <DashboardOverview />
      <BoardListView {dummy_boards} />
    </section>
  </div>

  <button
    class="h-14 w-14 fixed bottom-12 right-12 z-10 shadow-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full lg:ml-40 ml-10 text-sm mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    on:click={() => (hidden = false)}
  >
    <PlusOutline class="w-6 h-6 m-auto" />
  </button>

  <Drawer
    placement="right"
    transitionType="fly"
    {transitionParams}
    bind:hidden
    id="sidebar4"
  >
    <div class="flex items-center max-h-screen">
      <h5
        id="drawer-label"
        class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        <InfoCircleSolid class="w-4 h-4 me-2.5" />New Board
      </h5>
      <CloseButton
        on:click={() => (hidden = true)}
        class="mb-4 dark:text-white"
      />
    </div>
    <form action="#" class="mb-6">
      <div class="mb-6">
        <Label for="title" class="block mb-2">Board Name</Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Project Manhattan"
        />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">Description</Label>
        <Textarea
          id="message"
          placeholder="Write board description..."
          rows="4"
          name="message"
        />
      </div>
      <div class="mb-6">
        <Label for="due-time" class="mb-2">Deadline</Label>
        <Input id="datetime" name="date" required type="datetime-local" />
      </div>
      <div class="mb-4">
        <Label for="members" class="mb-2">Add Members</Label>
        <div class="relative">
          <Input
            noBorder
            id="search"
            placeholder="Enter usernames..."
            class="p-3"
            bind:value={search_term}
          />
          {#if suggested_users.length > 0}
            <div
              id="dropdown"
              class="absolute z-20 w-full bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700"
            >
              <ul
                class="w-full py-1 text-base text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                {#each suggested_users as suggestion}
                  <li>
                    <button
                      class="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      on:click|stopPropagation={() => {
                        suggested_users = [];
                        selected_users = [...selected_users, suggestion];
                        search_term = "";
                      }}
                    >
                      {@html makeMatchBold(suggestion.user_name, search_term)}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      </div>
      <ScrollableUserList users={selected_users} />
      <Button
        type="submit"
        class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex w-40 mx-auto bg-blue-700 hover:bg-blue-800"
      >
        <CalendarEditSolid class="w-3.5 h-3.5 me-2.5 text-white" /> Create Board
      </Button>
    </form>
  </Drawer>
</div>
