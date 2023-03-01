<script lang="ts">
  import { type Hero, client } from "../lib/apiclient";
  import { Mode } from "../lib/apiclient";

  let heroes: Promise<Array<Hero>> = client.getHeroes();

</script>

<heroes>
  <h1>Super Heroes</h1>
  <div class="a-button-wrapper">
    <a href="/{Mode[Mode.new]}" class="button">Add...</a>
  </div>
  {#await heroes then heroes}
    <table>
      <tr>
        <th>Name</th>
        <th>Super Power</th>
        <th>Real Name</th>
        <th>A.K.A</th>
      </tr>
    {#each heroes as hero }
      <tr>
        <td><a href="/{Mode[Mode.show]}/{hero.uuid}">{hero.name}</a></td>
        <td>{hero.superpower}</td>
        <td>{hero.realname}</td>
        <td>{hero.aka ?? ''}</td>
      </tr>
    {/each}
    </table>
  {/await}

</heroes>

<style>
  tr:first-child {
    width: 100px;
  }
</style>

