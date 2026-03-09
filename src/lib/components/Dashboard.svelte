<script>
  let { children } = $props();
</script>

<div class="row">
  {@render children()}
</div>

<style>
  .row {
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .row > :global(*) {
    flex: 1;
    min-width: 200px;
    max-width: 300px;
  }
</style>