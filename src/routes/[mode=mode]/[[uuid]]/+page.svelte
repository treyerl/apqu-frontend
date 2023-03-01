<script lang="ts">
  import { goto } from "$app/navigation";
  import InlineTextEdit from "$lib/InlineTextEdit.svelte";
  import { client, Mode, type Hero } from "../../../lib/apiclient";
  import type { PageData } from "./$types";
  
  export let data: PageData;

  let hero: Hero;
  if (data.mode == Mode.new){
    hero = {
      uuid: null,
      name: '',
      superpower: '',
      realname: '',
      aka: ''
    };
  } else {
    client.getHero(data.uuid!).then((v) => hero = v);
  }

  async function save() {
    await client.updateHero(hero);
    await goto(`/${Mode[Mode.show]}/${data.uuid}`);
  }

  async function create() {
    const newHero = await client.createHero(hero);
    await goto(`/${Mode[Mode.show]}/${newHero.uuid}`);
  }

  async function deleteHero() {
    if (confirm(`Do you really want to delete ${hero.name}?`)) {
      await client.deleteHero(hero);
      await goto('/');
    }
  }

</script>

<hero>
  <div class="actions">
    <a href="/">All heroes</a>
  </div>

  {#if hero !== undefined}
    <h1>Details of {hero.name}</h1>

    <div class="a-button-wrapper">
      {#if data.mode == Mode.show}
        <a href="/{Mode[Mode.edit]}/{data.uuid}" class="button primary">Edit</a>
        <button on:click={deleteHero} class="danger">Delete</button>

      {:else if data.mode == Mode.edit}
        <a href="/{Mode[Mode.show]}/{data.uuid}" class="button">Abort</a>
        <button on:click={save} class="primary">Save</button>

      {:else if data.mode == Mode.new}
        <a href="/" class="button">Abort</a>
        <button on:click={create} class="primary">Create</button>
      {/if}
    </div>

    <table>
      <tr>
        <th>Name</th>
        <td><InlineTextEdit mode={data.mode} bind:value={hero.name}/></td>
      </tr>
      <tr>
        <th>Super Power</th>
        <td><InlineTextEdit mode={data.mode} bind:value={hero.superpower}/></td>
      </tr>
      <tr>
        <th>Real Name</th>
        <td><InlineTextEdit mode={data.mode} bind:value={hero.realname}/></td>
      </tr>
      <tr>
        <th>A.K.A</th>
        <td><InlineTextEdit mode={data.mode} bind:value={hero.aka}/></td>
      </tr>
      <tr>
        <th>UUID</th>
        <td>{hero.uuid}</td>
      </tr>
    </table>
  {/if}
</hero>

<style>
  tr:first-child {
    width: 160px;
  }
</style>