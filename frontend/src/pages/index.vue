<template>
  <v-container class="fluid">
    <v-row justify="center">
      <v-col
        cols="12"
        lg="10"
      >
        <v-responsive class="mx-auto flex-1-1">
          <span class="text-center">toybox</span>
          <v-row>
            <v-col cols="8">
              <draggable
                class="toybox-grid"
                group="toytag"
                item-key="id"
                :list="unusedToyTags"
                @change="console.log"
                :delay="100"
                :delayOnTouchOnly="true"
              >
                <!-- TODO HOVER ANIMATION -->
                <template #item="{ element, index }">
                  <v-sheet
                    :color="'success'"
                    style="aspect-ratio: 1; height: 6em"
                  >
                    {{ element.name }}
                  </v-sheet>
                </template>
              </draggable>
              display filter here
            </v-col>
            <v-col
              class="d-flex flex-column align-center"
              cols="4"
            >
              <delete-toy />
              <div class="mt-2 mb-2" />

              <v-btn
                prepend-icon="mdi-plus"
                text="add-toy"
              />
            </v-col>
          </v-row>
        </v-responsive>
      </v-col>
      <v-col
        class="overflow-auto"
        cols="12"
        lg="10"
      >
        <!-- TODO IF NOT CONNECTED MESSAGE HERE-->
        <toy-pad />
      </v-col>
      <v-col
        cols="12"
        lg="10"
      >
        sync here
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
  import type { ToyTag } from '@/types/tag'
  import Draggable from 'vuedraggable'
  import { useDisplay } from 'vuetify'
  import { useAppStore } from '@/stores/app'
  import { v } from 'vue-router/dist/router-CWoNjPRp.mjs'

  const { mdAndDown } = useDisplay()

  const appStore = useAppStore()

  const { toyTags } = storeToRefs(appStore)

  const unusedToyTags = computed(() =>
    toyTags.value.filter((x: ToyTag) => x.index === -1)
  )
</script>
<style lang="scss" scoped>
  .toybox-grid {
    height: 300px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
    gap: 1em;
    padding: 0.5em;
    overflow: auto;
    background-color: red;
  }
</style>
