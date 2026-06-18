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
  margin: 0;
  border: 1px solid rgba(202, 164, 90, 0.22);
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
}

.info-table th,
.info-table td {
  padding: 0.7rem 0.9rem;
  text-align: left;
  border-bottom: 1px solid rgba(202, 164, 90, 0.14);
}

.info-table th {
  font-family: var(--font-display);
  color: var(--color-gold);
  background: rgba(202, 164, 90, 0.08);
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  white-space: nowrap;
  position: sticky;
  top: 0;
}

.info-table tbody tr:nth-child(even) {
  background: rgba(202, 164, 90, 0.03);
}
.info-table tbody tr:hover {
  background: rgba(202, 164, 90, 0.07);
}

.info-table td {
  color: var(--parchment);
  font-size: 0.95rem;
}
.info-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
