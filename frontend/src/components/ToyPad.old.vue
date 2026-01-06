<template>
  <div class="toypad-column">
    <div class="toypad container">
      <div class="red-strip" />

      <div class="tag-pad top-left">
        <toy-tag :index="1" />
      </div>
      <div class="tag-pad corner-left">
        <toy-tag :index="4" />
      </div>
      <div class="tag-pad center-left">
        <toy-tag :index="5" />
      </div>

      <div class="tag-pad center">
        <toy-tag
          height="70%"
          width="70%"
          :index="2"
        />
      </div>

      <div class="tag-pad top-right">
        <toy-tag :index="3" />
      </div>
      <div class="tag-pad corner-right">
        <toy-tag :index="6" />
      </div>
      <div class="tag-pad center-right">
        <toy-tag :index="7" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { TagMap } from '@/types/tag'

  const emit = defineEmits<{
    (e: 'drop', pad: number): void
  }>()

  const placedTags = defineModel<TagMap>('tags', {
    required: true
  })

  const onDrop = (pad: number) => {
    emit('drop', pad)
  }
</script>

<style scoped lang="scss">
  $detail-color: rgb(53, 53, 53);
  .toypad-column {
    flex-basis: 0;
  }

  .container {
    display: inline-flex;
    position: relative;
    margin: 1.5em auto;
    border-radius: 0.5rem;
    box-shadow:
      0 4px 8px 0 #00000033,
      0 6px 20px 0 #00000030;
    background-color: rgb(239, 239, 239);
    padding: 1em;
  }

  .toypad {
    position: relative;
    align-content: end;
    background-color: #49494b;
    background-image: linear-gradient(#49494b, #424244);
    padding-top: 4em;
    width: 100%;
    aspect-ratio: 4/3;
    height: auto;
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      top: calc(2.617% - 1px);
      left: calc(2.617% - 1px);
      right: calc(2.617% - 1px);
      bottom: calc(2.617% - 1px);
      border: 1px solid $detail-color; /* color of inner border */
      pointer-events: none; /* so it doesn’t block clicks */
    }
  }

  .red-strip {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 6.5%;
    height: 1.75%;
    transform: translateX(-50%);

    border: 1px solid rgb(34, 34, 34);
    border-bottom: none;
    background-color: rgb(224, 4, 4);
    box-sizing: border-box;
  }

  .tag-pad {
    background-color: white;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    height: auto;
    box-sizing: border-box;
    overflow: hidden;

    &.top-left {
      left: 2.617%;
      top: 33.57%;
      width: 22.5%;
      aspect-ratio: 4/4.3;
      border-top: 1px solid $detail-color;
      border-right: 1px solid $detail-color;
    }
    &.corner-left {
      left: 2.617%;
      bottom: 2.617%;
      width: 22.5%;
      aspect-ratio: 4/4.3;
    }
    &.center-left {
      left: calc(2.617% + 22.5%);
      bottom: 2.617%;
      aspect-ratio: 4 / 4.3;
      width: 22.5%;
      border-top: 1px solid $detail-color;
      border-right: 1px solid $detail-color;
    }

    &.center {
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      aspect-ratio: 1;
      width: 27.5%;
      border-radius: 100%;
      border: 1px solid $detail-color;
    }

    &.top-right {
      right: 2.617%;
      top: 33.57%;
      aspect-ratio: 4 / 4.3;
      width: 22.5%;
      border-top: 1px solid $detail-color;
      border-left: 1px solid $detail-color;
    }
    &.corner-right {
      right: 2.617%;
      bottom: 2.617%;
      aspect-ratio: 4 / 4.3;
      width: 22.5%;
    }
    &.center-right {
      right: calc(2.617% + 22.5%);
      bottom: 2.617%;
      aspect-ratio: 4 / 4.3;
      width: 22.5%;
      border-top: 1px solid $detail-color;
      border-left: 1px solid $detail-color;
    }
  }
</style>
