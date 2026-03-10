<script>
  import BigNumber from '$lib/components/BigNumber.svelte';

  let { aGrades = 0, bGrades = 0, cGrades = 0 } = $props();
</script>

<div class="row">
  <BigNumber number={aGrades} label="A Grades" />
  <BigNumber number={bGrades} label="B Grades" />
  <BigNumber number={cGrades} label="C Grades" />
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