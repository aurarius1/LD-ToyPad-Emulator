<template>
  <v-footer
    app
    height="40"
  >
    <v-icon-btn
      icon="mdi-theme-light-dark"
      @click="toggleTheme"
    />
    <a
      class="d-inline-block mx-2 social-link"
      href="https://github.com/Berny23/LD-ToyPad-Emulator"
      rel="noopener noreferrer"
      target="_blank"
      title="Github"
    >
      <v-icon
        icon="mdi-github"
        size="24"
      />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px"
    >
      &copy; {{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">
        Berny23, Cort1237 and many others
      </span>
      —
      <a
        class="text-decoration-none on-surface"
        href="https://choosealicense.com/licenses/mit"
        rel="noopener noreferrer"
        target="_blank"
      >
        MIT License
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const toggleTheme = () => {
    theme.toggle()
  }
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
