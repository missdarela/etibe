import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)

  const users = ref([
    { id: 1, name: 'Charles', fullName: 'Benn Charles', email: 'charles@sujo.app', phone: '+234 801 234 5678', avatar: 'https://i.pravatar.cc/150?img=12', location: 'Lagos, Nigeria' },
    { id: 2, name: 'Chidi', fullName: 'Chidi Okonkwo', email: 'chidi@sujo.app', avatar: 'https://i.pravatar.cc/150?img=7', location: 'Lagos, Nigeria' },
    { id: 3, name: 'Amaka', fullName: 'Amaka Johnson', email: 'amaka@sujo.app', avatar: 'https://i.pravatar.cc/150?img=9', location: 'Abuja, Nigeria' },
    { id: 4, name: 'Tunde', fullName: 'Tunde Bakare', email: 'tunde@sujo.app', avatar: 'https://i.pravatar.cc/150?img=3', location: 'Ibadan, Nigeria' },
    { id: 5, name: 'Ngozi', fullName: 'Ngozi Eze', email: 'ngozi@sujo.app', avatar: 'https://i.pravatar.cc/150?img=4', location: 'Enugu, Nigeria' },
    { id: 6, name: 'Kunle', fullName: 'Kunle Adeyemi', email: 'kunle@sujo.app', avatar: 'https://i.pravatar.cc/150?img=5', location: 'Lagos, Nigeria' },
    { id: 7, name: 'Blessing', fullName: 'Blessing Okoro', email: 'blessing@sujo.app', avatar: 'https://i.pravatar.cc/150?img=6', location: 'Port Harcourt, Nigeria' }
  ])

  const isAuthenticated = computed(() => !!currentUser.value)
  const user = computed(() => currentUser.value)

  function getUserById(id) {
    return users.value.find(u => u.id === id) || null
  }

  function login(credentials) {
    const existing = users.value.find(u => u.email === credentials.email)
    if (existing) {
      currentUser.value = { ...existing }
    } else {
      currentUser.value = { ...users.value[0], email: credentials.email }
    }
    localStorage.setItem('user', JSON.stringify(currentUser.value))
  }

  function signup(userData) {
    const newUser = {
      id: users.value.length + 1,
      name: userData.fullName.split(' ')[0],
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      avatar: `https://i.pravatar.cc/150?img=${(users.value.length + 1) % 70 + 1}`,
      location: 'Lagos, Nigeria'
    }
    users.value.push(newUser)
    currentUser.value = newUser
    localStorage.setItem('user', JSON.stringify(currentUser.value))
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('user')
  }

  function initAuth() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      currentUser.value = JSON.parse(savedUser)
    }
  }

  return {
    currentUser,
    user,
    users,
    isAuthenticated,
    getUserById,
    login,
    signup,
    logout,
    initAuth
  }
})
