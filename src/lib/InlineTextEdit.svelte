<script lang="ts">
  import { Mode } from "./apiclient";

  export let mode: Mode;
  export let value: string;
</script>

<inline-text-edit>
  {#if mode == Mode.show}
    {value ?? ''}
  {:else}
    <input type="text" bind:value={value}/>
  {/if}
</inline-text-edit>

<style>
  input {
    width: 100%;
  }
</style>