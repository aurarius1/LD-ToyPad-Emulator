<template>
  <div class="wrapper">
    <Draggable
      v-model="list"
      class="delete-pad"
      group="toytag"
      item-key="id"
      :sort="false"
      @change="onPadDrop"
      :delay="100"
    >
      <template #header>delete</template>
      <template #item="{ element }">deleting {{ element.id }}</template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'
  import { ToyTag } from '@/types/tag'
  import Draggable from 'vuedraggable'

  const appStore = useAppStore()
  const { toyTags } = storeToRefs(appStore)

  const list = ref<ToyTag[]>([])
  const onPadDrop = (event: any) => {
    if ('added' in event) {
      const toDelete = event['added'].element
      toyTags.value = toyTags.value.filter((x: ToyTag) => x.id !== toDelete.id)
      list.value = []
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 140px;
    max-width: 10rem; /* optional */
    aspect-ratio: 1 / 1; /* 🔑 makes it square */
  }
  .delete-pad {
    background: green;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
