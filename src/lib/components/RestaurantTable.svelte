<script>
  let { data } = $props();
</script>

<table>
  <thead>
    <tr>
      <th>Restaurant</th>
      <th>Borough</th>
      <th>Cuisine</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        <td>{row.dba}</td>
        <td>{row.boro}</td>
        <td>{row.cuisine_description}</td>
        <td>{row.grade}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  th {
    text-align: left;
    padding: 0.5rem;
    border-bottom: 2px solid var(--color-dark-gray);
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  td {
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  tr:hover {
    background-color: var(--color-light-gray);
  }

</style>