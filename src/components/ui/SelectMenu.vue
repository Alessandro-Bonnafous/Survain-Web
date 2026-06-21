<!--
  Dropdown custom (remplace les <select> natifs) : le menu natif est rendu par
  l'OS et son survol n'est pas stylable de façon fiable. Ici le menu est du DOM,
  ce qui permet le survol doré « façon tableau » (cf. InfoTable). Accessible :
  listbox/option, navigation clavier (flèches, Entrée, Échap, Début/Fin),
  fermeture au clic dehors et à Échap. Inspiré de ui/LangSwitcher.vue.
-->
<template>
  <div ref="rootEl" class="select" :class="{ 'select--open': open }">
    <button
      ref="toggleEl"
      type="button"
      class="select__toggle"
      :aria-label="ariaLabel"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="toggle"
      @keydown.down.prevent="openAndFocus(selectedIndex)"
      @keydown.up.prevent="openAndFocus(selectedIndex)"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="select__value">{{ selectedLabel }}</span>
      <svg
        class="select__chevron"
        viewBox="0 0 12 8"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        aria-hidden="true"
      >
        <path d="M1 1.5 L6 6.5 L11 1.5" />
      </svg>
    </button>

    <ul v-if="open" ref="menuEl" class="select__menu" role="listbox" :aria-label="ariaLabel">
      <li
        v-for="opt in options"
        :key="opt.value"
        role="option"
        :aria-selected="opt.value === modelValue"
      >
        <button
          type="button"
          class="select__option"
          :class="{ 'select__option--selected': opt.value === modelValue }"
          @click="pick(opt.value)"
          @keydown.down.prevent="move(1)"
          @keydown.up.prevent="move(-1)"
          @keydown.home.prevent="focusOption(0)"
          @keydown.end.prevent="focusOption(options.length - 1)"
          @keydown.enter.prevent="pick(opt.value)"
          @keydown.space.prevent="pick(opt.value)"
          @keydown.esc.prevent="close(true)"
        >
          {{ opt.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

interface Option {
  value: string | number
  label: string
}

const props = defineProps<{
  modelValue: string | number
  options: Option[]
  ariaLabel?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const toggleEl = ref<HTMLButtonElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? '',
)
const selectedIndex = computed(() => {
  const i = props.options.findIndex((o) => o.value === props.modelValue)
  return i < 0 ? 0 : i
})

function optionButtons(): HTMLButtonElement[] {
  return menuEl.value ? Array.from(menuEl.value.querySelectorAll('.select__option')) : []
}

function focusOption(index: number) {
  const btns = optionButtons()
  if (!btns.length) return
  const max = btns.length - 1
  const i = index < 0 ? max : index > max ? 0 : index
  btns[i]?.focus()
}

function move(delta: number) {
  const btns = optionButtons()
  const current = btns.findIndex((b) => b === document.activeElement)
  focusOption(current + delta)
}

async function openAndFocus(index: number) {
  open.value = true
  await nextTick()
  focusOption(index)
}

function toggle() {
  if (open.value) close()
  else void openAndFocus(selectedIndex.value)
}

function pick(value: string | number) {
  emit('update:modelValue', value)
  close(true)
}

function close(focusToggle = false) {
  open.value = false
  if (focusToggle) toggleEl.value?.focus()
}

function onClickOutside(e: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.select {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

.select__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 13rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  text-align: left;
  color: var(--parchment);
  background-color: rgba(7, 8, 10, 0.9);
  border: 1px solid rgba(202, 164, 90, 0.4);
  padding: 0.6rem 0.85rem;
  cursor: pointer;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition:
    border-color 0.25s,
    background-color 0.25s,
    color 0.25s;
}
.select__toggle:hover,
.select--open .select__toggle {
  border-color: rgba(202, 164, 90, 0.7);
  background-color: rgba(202, 164, 90, 0.07);
  color: var(--color-gold-light);
}
.select__toggle:focus-visible {
  outline: 2px solid var(--color-gold-light);
  outline-offset: 2px;
}

.select__chevron {
  flex: none;
  width: 0.7rem;
  height: 0.7rem;
  color: var(--color-gold);
  transition: transform 0.25s var(--ease-theatrical);
}
.select--open .select__chevron {
  transform: rotate(180deg);
}

.select__menu {
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  z-index: 20;
  min-width: 100%;
  width: max-content;
  max-width: min(28rem, 86vw);
  max-height: 16rem;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0.3rem 0;
  background: rgba(7, 8, 10, 0.97);
  border: 1px solid rgba(202, 164, 90, 0.3);
  box-shadow: 0 14px 30px -12px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
}

.select__option {
  width: 100%;
  background: none;
  border: 0;
  color: var(--parchment);
  font-family: var(--font-body);
  font-size: 0.92rem;
  text-align: left;
  padding: 0.55rem 1rem;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}
/* Survol/focus : même teinte dorée que les lignes de tableau au survol. */
.select__option:hover,
.select__option:focus-visible {
  background: rgba(202, 164, 90, 0.07);
  color: var(--color-gold-light);
  outline: none;
}
.select__option--selected {
  color: var(--color-gold);
  background: rgba(202, 164, 90, 0.12);
}
.select__option--selected:hover,
.select__option--selected:focus-visible {
  background: rgba(202, 164, 90, 0.16);
}
</style>
