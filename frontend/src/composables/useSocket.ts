// src/composables/useSocket.ts
import type { ToyTag } from '@/types/tag'
import { io, type Socket } from 'socket.io-client'
import { onMounted, onUnmounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import useAxios from './useAxios'

export function useSocket() {
  const socket: Socket = io()
  const connected = ref(false)

  // Reactive state you want to update from socket
  const padColors = ref<[string, string, string]>(['', '', ''])
  const tokens = ref<any[]>([]) // example: list of tokens

  // Connect and set up listeners
  const connect = () => {
    if (socket.connected) {
      return
    }

    socket.connect()

    socket.on('connect', () => {
      connected.value = true
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      connected.value = false
      console.log('Socket disconnected')
    })

    socket.on('refreshTokens', () => {
      console.log('Tokens should refresh!')
      const { toyTagEndpoint } = useAxios()
      const appStore = useAppStore()
      toyTagEndpoint.getToyTags().then((tags: ToyTag[]) => {
        appStore.toyTags = tags
        console.log('refreshed tags')
      })
      // fetch latest tokens from API or update reactive state here
    })

    /*socket.on('Color All', ([top, left, right]) => {
      padColors.value = [top, left, right]
    })

    

    socket.on('Connection True', () => {
      console.log('Game pad is connected!')
    })*/
  }

  // Emit helpers
  const deleteToken = (uid: string) => {
    socket.emit('deleteToken', uid)
  }
  const syncPad = (pad: any) => {
    socket.emit('syncToyPad', pad)
  }

  // Automatically clean up listeners when component using this unmounts
  onUnmounted(() => {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('Color All')
    socket.off('refreshTokens')
    socket.off('Connection True')
  })

  // Optional: auto-connect on mount
  onMounted(connect)

  return {
    socket,
    connected,
    padColors,
    tokens,
    deleteToken,
    syncPad,
    connect
  }
}
