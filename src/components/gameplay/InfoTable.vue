<template>
  <div class="info-table__wrap">
    <table class="info-table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i" scope="col">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in rows" :key="r">
          <td v-for="(cell, c) in row" :key="c">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{ headers: string[]; rows: string[][] }>()
</script>

<style scoped>
.info-table__wrap {
  overflow-x: auto;
  margin: 1rem 0;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
}

.info-table th,
.info-table td {
  border: 1px solid var(--color-gold);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.info-table th {
  color: var(--color-gold);
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.03em;
}

.info-table td {
  color: var(--color-gold-light);
}
</style>
