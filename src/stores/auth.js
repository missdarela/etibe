import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  function login(credentials) {
    user.value = {
      id: 1,
      name: 'Charles',
      fullName: 'Benn Charles',
      email: credentials.email,
      phone: '+234 801 234 5678',
      avatar: 'https://i.pravatar.cc/150?img=12',
      location: 'Lagos, Nigeria'
    }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function signup(userData) {
    user.value = {
      id: 1,
      name: userData.fullName.split(' ')[0],
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      avatar: 'https://i.pravatar.cc/150?img=12',
      location: 'Lagos, Nigeria'
    }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  function initAuth() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    initAuth
  }
})
