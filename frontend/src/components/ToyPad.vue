<template>
  <div
    id="toypad"
    class="container"
  >
    <div id="red-strip"></div>
    <div id="detail-00"></div>
    <div id="detail-01"></div>
    <div id="detail-02"></div>
    <div id="detail-03"></div>

    <div>
      <div class="drop-targets">
        <div
          id="toypad1"
          class="box"
          max-items="1"
          pad-index="1"
          pad-num="2"
        >
          <toy-tag :index="1" />
        </div>
        <div
          id="toypad2"
          class="box"
          max-items="1"
          pad-index="2"
          pad-num="1"
        >
          <toy-tag :index="2" />
        </div>
        <div
          id="toypad3"
          class="box"
          max-items="1"
          pad-index="3"
          pad-num="3"
        >
          <toy-tag :index="3" />
        </div>
      </div>
      <div class="drop-targets">
        <div
          id="toypad4"
          class="box"
          max-items="1"
          pad-index="4"
          pad-num="2"
        >
          <toy-tag :index="4" />
        </div>
        <div
          id="toypad5"
          class="box"
          max-items="1"
          pad-index="5"
          pad-num="2"
        >
          <toy-tag :index="5" />
        </div>
        <div
          id="toypad6"
          class="box"
          max-items="1"
          pad-index="6"
          pad-num="3"
        >
          <toy-tag :index="6" />
        </div>
        <div
          id="toypad7"
          class="box"
          max-items="1"
          pad-index="7"
          pad-num="3"
        >
          <toy-tag :index="7" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
