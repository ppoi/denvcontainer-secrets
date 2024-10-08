<script context="module">
  import { writable } from "svelte/store";
  export const loading = writable(false);
</script>

{#if $loading}
<div class="loading-screen">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
{/if}

<style>
  :scope { display: block; }
  .loading-screen {
    display: table;
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 99999;
  }
</style>