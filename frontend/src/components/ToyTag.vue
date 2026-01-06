<template>
  <Draggable
    v-model="list"
    class="pad"
    group="toytag"
    item-key="id"
    :sort="false"
    :style="`height: ${height}; width: ${width};`"
    @change="onPadDrop"
    :delay="100"
  >
    <template #item="{ element }">
      <v-sheet
        color="info"
        height="100%"
        width="100%"
      >
        {{ element.name }}
      </v-sheet>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
  import type { ToyTag } from '@/types/tag'
  import Draggable from 'vuedraggable'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()
  const { toyTags } = storeToRefs(appStore)

  // TODO MODEL FUNCTIONALITY TO RESTORE WHEN SYNCING

  const {
    height = '80%',
    width = '80%',
    index
  } = defineProps<{
    height?: string
    width?: string
    index: number
  }>()

  const list = ref<ToyTag[]>(
    toyTags.value.filter((x: ToyTag) => x.index === index)
  )

  const handleAdd = (element: ToyTag, newIndex: number) => {
    if (list.value.length > 1) {
      const removed = list.value[newIndex === 1 ? 0 : 1]!
      const indexOfRemoved = toyTags.value.findIndex(
        (x: ToyTag) => x.id === removed.id
      )
      toyTags.value[indexOfRemoved].index = -1
    }
    const indexOfDropped = toyTags.value.findIndex(
      (x: ToyTag) => x.id === element.id
    )
    toyTags.value[indexOfDropped].index = index
    list.value = [list.value[newIndex]!]
  }

  const onPadDrop = (event: any) => {
    if ('added' in event) {
      handleAdd(event['added'].element, event['added'].newIndex)
      return
    }
    if ('removed' in event) {
      event['removed'].element.index = -1
    }
  }
</script>

<style scoped>
  .pad {
    display: flex;
  }
</style>
