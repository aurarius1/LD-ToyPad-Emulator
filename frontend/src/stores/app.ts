// Utilities
import type { Character } from '@/types/character'
import type { ToyTag } from '@/types/tag'
import type { Vehicle } from '@/types/vehicles'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // ---------- State ----------
  const toyTags = ref<ToyTag[]>([])

  const characters = ref<Character[]>([])
  const vehicles = ref<Vehicle[]>([])

  // ---------- Actions ----------
  const removeTag = (id: number) => {
    toyTags.value = toyTags.value.filter((tag: ToyTag) => tag.id !== id)
  }

  const addTag = (tag: ToyTag) => {
    toyTags.value.push(tag)
  }

  // ---------- Getters ----------
  const validCharacters = computed(() =>
    characters.value.filter(
      (character: Character) =>
        !character.name.toLowerCase().includes('unreleased') &&
        !character.name.toLowerCase().includes('unknown') &&
        !character.name.toLowerCase().includes('n/a')
    )
  )

  const validVehicles = computed(() =>
    vehicles.value.filter((vehicle: Vehicle) => vehicle.name !== 'Unknown')
  )

  const abilities = computed(() => [
    ...new Set([
      ...validCharacters.value.flatMap((c: Character) =>
        c.abilities.split(',')
      ),
      ...validVehicles.value.flatMap((v: Vehicle) => v.abilities.split(','))
    ])
  ])

  const worlds = computed(() => [
    ...new Set([
      ...validCharacters.value.map((c: Character) => c.world),
      ...validVehicles.value.map((v: Vehicle) => v.world)
    ])
  ])

  return {
    toyTags,
    characters,
    vehicles,
    removeTag,
    addTag,
    validCharacters,
    validVehicles,
    abilities,
    worlds
  }
})
