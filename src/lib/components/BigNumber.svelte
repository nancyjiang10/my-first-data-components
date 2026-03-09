
<script>
  let { number, label, footnote } = $props();
</script>

<div class="big-number">
  <span class="number">{number}</span>
  <span class="label">{label}</span>
  {#if footnote}
    <span class="footnote">{footnote}</span>
  {/if}
</div>

<style>
  .big-number {
    text-align: center;
    padding: 1.5rem;
    background-color: var(--color-accent);
    color: white;
    border-radius: 8px;
  }

  .number {
    display: block;
    font-size: 3rem;
    font-weight: bold;
    color: var(--color-white);
    line-height: 1.2;
  }

  .label {
    display: block;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.5rem;
  }

  .footnote {
    display: block;
    font-size: 0.75rem;
    color: var(--color-white);
    margin-top: 0.25rem;
    font-style: italic;
  }
</style>