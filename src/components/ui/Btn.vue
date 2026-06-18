<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="target"
    :rel="rel"
    :class="['btn', `btn--${variant ?? 'primary'}`, size === 'sm' && 'btn--sm']"
  >
    <span class="btn__face">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md'
  href?: string
  target?: string
  rel?: string
}>()
</script>

<style scoped>
.btn {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  text-decoration: none;
  transition: transform 0.25s var(--ease-theatrical);
}
.btn:hover {
  transform: translateY(-2px);
}

.btn__face {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.9rem;
  clip-path: polygon(
    var(--chamfer) 0,
    100% 0,
    100% calc(100% - var(--chamfer)),
    calc(100% - var(--chamfer)) 100%,
    0 100%,
    0 var(--chamfer)
  );
  transition:
    background 0.3s,
    filter 0.3s,
    box-shadow 0.3s,
    color 0.3s;
}

.btn--primary .btn__face {
  background: linear-gradient(150deg, var(--color-gold-light), var(--color-gold) 60%, #a07c38);
  color: #1a1206;
  box-shadow: 0 6px 26px rgba(202, 164, 90, 0.25);
}
.btn--primary:hover .btn__face {
  filter: brightness(1.12);
  box-shadow: 0 10px 32px rgba(202, 164, 90, 0.45);
}

.btn--ghost {
  background: var(--color-gold);
  clip-path: polygon(
    var(--chamfer) 0,
    100% 0,
    100% calc(100% - var(--chamfer)),
    calc(100% - var(--chamfer)) 100%,
    0 100%,
    0 var(--chamfer)
  );
  padding: 1px;
}
.btn--ghost .btn__face {
  background: rgba(8, 9, 11, 0.72);
  color: var(--color-gold-light);
  backdrop-filter: blur(2px);
}
.btn--ghost:hover .btn__face {
  background: rgba(202, 164, 90, 0.18);
  color: var(--color-gold-light);
}

.btn--sm .btn__face {
  padding: 0.7rem 1.4rem;
  font-size: 0.68rem;
}

.btn:focus-visible {
  outline: 2px solid var(--color-gold-light);
  outline-offset: 3px;
}
</style>
