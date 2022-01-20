<script lang="ts">
  export let line: PlainText
</script>

<span>{line.value}</span>{#if line.crlf}<br />{/if}
