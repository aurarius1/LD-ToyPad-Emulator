<template>
  <v-dialog
    v-model="showFilter"
    :max-height="height"
    :max-width="width"
    no-click-animation
    persistent
  >
    <v-card :title="t('toybox.filter.title')">
      <template #append>
        <v-icon-btn
          icon="mdi-close"
          @click="showFilter = false"
        />
      </template>
      <v-container class="pt-0">
        <v-row dense>
          <v-col cols="6">{{ t('toybox.filter.name') }}</v-col>
          <v-col cols="6">
            <v-text-field
              v-model="nameFilter"
              clearable
              density="compact"
              hide-details
              variant="outlined"
            >
              <template #append-inner="slotProps"></template>
            </v-text-field>
          </v-col>
          <v-col cols="6">{{ t('toybox.filter.world') }}</v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="worldFilter"
              clearable
              density="compact"
              hide-details
              :items="worlds"
              multiple
              variant="outlined"
            />
          </v-col>
          <v-col cols="6">{{ t('toybox.filter.abilities') }}</v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="abilitiesFilter"
              clearable
              density="compact"
              hide-details
              :items="abilities"
              multiple
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              block
              class="mt-2"
              :disabled="!anyFilterSet"
              prepend-icon="mdi-delete"
              :text="t('toybox.filter.clear')"
              @click="clearFilter"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>

  <v-row dense>
    <v-col
      cols="7"
      lg="8"
    >
      <v-sheet rounded="xl">
        <draggable
          class="toybox-grid"
          :delay="100"
          delay-on-touch-only
          group="toytag"
          item-key="id"
          :list="toDisplay"
          @change="console.log"
        >
          <!-- TODO HOVER ANIMATION -->
          <template #item="{ element }">
            <toy-tag
              height="6em"
              :tag="element"
            />
          </template>
        </draggable>
      </v-sheet>
    </v-col>
    <v-col
      class="d-flex flex-column align-center"
      cols="5"
      lg="4"
    >
      <delete-toy-tag />
      <div class="mt-2 mb-2" />

      <v-btn
        prepend-icon="mdi-plus"
        :text="t('toybox.create_toy')"
        @click="createDialog = true"
      />
      <v-btn
        class="mt-2"
        prepend-icon="mdi-filter-variant"
        :text="t('toybox.filter.show')"
        @click="showFilter = true"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { ToyTag } from '@/types/tag'
  import { useI18n } from 'vue-i18n'
  import Draggable from 'vuedraggable'
  import { useDisplay } from 'vuetify'
  import { useAppStore } from '@/stores/app'

  const { t } = useI18n()
  const { mdAndUp } = useDisplay()
  const appStore = useAppStore()

  const createDialog = defineModel<boolean>('createDialog', {
    required: true
  })

  const unusedToyTags = defineModel<ToyTag[]>('toyTags', {
    required: true
  })

  const { abilities, worlds } = storeToRefs(appStore)
  const showFilter = ref<boolean>(false)
  const nameFilter = ref<string>()
  const abilitiesFilter = ref<string[]>([])
  const worldFilter = ref<string[]>()

  const height = computed(() => (mdAndUp ? '700px' : '100%'))
  const width = computed(() => (mdAndUp ? '600px' : '100%'))

  // APPLY ABILITIES AND WORLD FILTER
  const toDisplay = computed(() => {
    if (nameFilter.value) {
      return unusedToyTags.value.filter((x: ToyTag) =>
        x.name
          .toLocaleLowerCase()
          .includes(nameFilter.value!.toLocaleLowerCase())
      )
    }
    return unusedToyTags.value
  })

  const anyFilterSet = computed(() => {
    return (
      !!nameFilter.value ||
      (worldFilter.value?.length ?? 0) > 0 ||
      (abilitiesFilter.value?.length ?? 0) > 0
    )
  })

  const clearFilter = () => {
    nameFilter.value = undefined
    worldFilter.value = []
    abilitiesFilter.value = []
  }
</script>

<style scoped lang="scss">
  .toybox-grid {
    height: 300px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(6em, 1fr));
    gap: 0.3em;
    padding: 0.5em;
    overflow: auto;
    border-radius: 30px;
  }
</style>
