// Utilities
import type { ToyTag } from '@/types/tag'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    toyTags: [
      {
        id: 0,
        name: 'batman',
        index: -1,
        uid: 'batman',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 1,
        name: 'wyldstyle',
        index: -1,
        uid: 'wyldstyle',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 2,
        name: 'gandalf',
        index: -1,
        uid: 'gandalf',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 3,
        name: 'harry potter',
        index: -1,
        uid: 'harry potter',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 5,
        name: 'lord voldemort',
        index: -1,
        uid: 'lord voldemort',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 6,
        name: 'ethan hunt',
        index: -1,
        uid: 'ethan hunt',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 8,
        name: 'homer simpson',
        index: -1,
        uid: 'homer simpson',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 9,
        name: 'sonic',
        index: -1,
        uid: 'sonic',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 10,
        name: 'sonic2',
        index: -1,
        uid: 'sonic2',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 11,
        name: 'sonic3',
        index: -1,
        uid: 'sonic3',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      },
      {
        id: 12,
        name: 'sonic4',
        index: -1,
        uid: 'sonic4',
        type: 'character',
        vehicleUpgradesP23: 0,
        vehicleUpgradesP25: 0
      }
    ] as ToyTag[]
  }),
  actions: {
    removeTag(id: number) {
      this.toyTags = this.toyTags.filter((tag: ToyTag) => tag.id !== id)
    },

    addTag(tag: ToyTag) {
      this.toyTags.push(tag)
    }
  }
})
