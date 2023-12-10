<script lang="ts">
    import type { Board } from "$lib/interfaces/board";
    export let data: any;
    let board: Board = data.board;
</script>

<h1>{board.title}</h1>
