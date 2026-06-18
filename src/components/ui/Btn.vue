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
  /* Spread négatif : la lueur dorée reste sous le bouton et ne déborde pas sur
     le bouton voisin (sinon une bordure dorée « apparaît » sur le ghost). */
  box-shadow: 0 6px 20px -6px rgba(202, 164, 90, 0.3);
}
.btn--primary:hover .btn__face {
  filter: brightness(1.12);
  box-shadow: 0 12px 24px -8px rgba(202, 164, 90, 0.5);
}

.btn--ghost {
  /* Liseré doré : fond or de l'élément externe, révélé sur 1px par le padding. */
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
  transition: background 0.3s;
}
.btn--ghost .btn__face {
  /* Face quasi opaque : empêche la lueur d'un bouton voisin de transparaître. */
  background: rgba(8, 9, 11, 0.92);
  color: var(--color-gold-light);
  backdrop-filter: blur(2px);
}
/* Au survol, le liseré s'éclaircit (rim plus clair)... */
.btn--ghost:hover {
  background: var(--color-gold-light);
}
/* ...et la face se teinte d'or PAR-DESSUS le fond sombre (et non en révélant
   le liseré or par transparence, ce qui virait au bouton plein doré illisible)
   + légère lueur dorée intérieure. */
.btn--ghost:hover .btn__face {
  background:
    linear-gradient(rgba(202, 164, 90, 0.18), rgba(202, 164, 90, 0.18)), rgba(8, 9, 11, 0.92);
  color: var(--color-gold-light);
  box-shadow: inset 0 0 18px -4px rgba(242, 213, 142, 0.4);
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
