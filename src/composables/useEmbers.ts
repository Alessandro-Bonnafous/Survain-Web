import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useEmbers(targetRef: Ref<HTMLElement | null>, count = 18) {
  let reduced = false
  let cleanup: (() => void) | null = null

  onMounted(() => {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !targetRef.value) return

    const container = targetRef.value
    const created: HTMLElement[] = []

    for (let i = 0; i < count; i++) {
      const ember = document.createElement('span')
      ember.className = 'ember'
      const nearFire = i < 11
      if (nearFire) {
        ember.style.left = 80 + Math.random() * 12 + '%'
        ember.style.bottom = 6 + Math.random() * 8 + '%'
        ember.style.setProperty('--rise', -(20 + Math.random() * 30) + 'vh')
        ember.style.setProperty('--dx', Math.random() * 50 - 15 + 'px')
        ember.style.setProperty('--d', 4 + Math.random() * 4 + 's')
      } else {
        ember.style.left = Math.random() * 100 + '%'
        ember.style.setProperty('--rise', -(45 + Math.random() * 40) + 'vh')
        ember.style.setProperty('--dx', Math.random() * 70 - 35 + 'px')
        ember.style.setProperty('--d', 8 + Math.random() * 8 + 's')
      }
      ember.style.setProperty('--delay', Math.random() * 8 + 's')
      const s = 0.6 + Math.random() * 1.3
      ember.style.width = s * 3 + 'px'
      ember.style.height = s * 3 + 'px'
      container.appendChild(ember)
      created.push(ember)
    }

    cleanup = () => {
      created.forEach((e) => e.remove())
    }
  })

  onBeforeUnmount(() => {
    if (cleanup) cleanup()
  })
}
