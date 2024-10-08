<script context="module">
  import { writable } from "svelte/store";
  let sessionSN = writable(0);
</script>
<script>
  import { onDestroy, onMount } from "svelte";
  import { routeMatched, navigate, registerDOMEventListeners, unregisterDOMEventListeners } from "@tblab/ella-spa-core/lib/router";
  import session from "@tblab/ella-spa-core/lib/session";

  onMount(()=>{
    session.listener = (state)=>{
      console.log('[app] change sessionstate.', session.isAnonymous());
      $sessionSN += 1;
      navigate(location.href, true);
    };
    navigate(window.location.href, true);
    registerDOMEventListeners();
  });
  onDestroy(()=>{
    unregisterDOMEventListeners();
  })
  $: console.log('[app] matched?', $routeMatched);
</script>

{#key $sessionSN}
<div class="container-fluid">
  {#if !$routeMatched}
    <div>not found.</div>
  {/if}
</div>
{/key}