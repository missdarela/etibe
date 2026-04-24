import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGroupsStore = defineStore('groups', () => {
  const activeGroupId = ref(1)

  const groups = ref([
    {
      id: 1,
      name: '9-5 to Freedom',
      avatar: 'https://i.pravatar.cc/150?img=1',
      members: 12,
      contributionAmount: 50000,
      frequency: 'weekly',
      progress: 75,
      hasNotification: true,
      nextPayout: '2026-04-25',
      nextPayoutUser: 'Chidi Okonkwo'
    },
    {
      id: 2,
      name: 'Kin & Coin',
      avatar: 'https://i.pravatar.cc/150?img=2',
      members: 8,
      contributionAmount: 100000,
      frequency: 'monthly',
      progress: 50,
      hasNotification: false,
      nextPayout: '2026-05-01',
      nextPayoutUser: 'Amaka Johnson'
    },
    {
      id: 3,
      name: 'Hand-in-Hand',
      avatar: 'https://i.pravatar.cc/150?img=3',
      members: 15,
      contributionAmount: 30000,
      frequency: 'weekly',
      progress: 90,
      hasNotification: true,
      nextPayout: '2026-04-23',
      nextPayoutUser: 'Tunde Bakare'
    },
    {
      id: 4,
      name: 'Money Moves',
      avatar: 'https://i.pravatar.cc/150?img=4',
      members: 10,
      contributionAmount: 75000,
      frequency: 'bi-weekly',
      progress: 60,
      hasNotification: false,
      nextPayout: '2026-04-28',
      nextPayoutUser: 'Ngozi Eze'
    },
    {
      id: 5,
      name: 'Village Vault',
      avatar: 'https://i.pravatar.cc/150?img=5',
      members: 20,
      contributionAmount: 25000,
      frequency: 'weekly',
      progress: 85,
      hasNotification: true,
      nextPayout: '2026-04-24',
      nextPayoutUser: 'Kunle Adeyemi'
    },
    {
      id: 6,
      name: 'Diaspora Circle',
      avatar: 'https://i.pravatar.cc/150?img=6',
      members: 6,
      contributionAmount: 150000,
      frequency: 'monthly',
      progress: 40,
      hasNotification: false,
      nextPayout: '2026-05-05',
      nextPayoutUser: 'Blessing Okoro'
    }
  ])

  const activeGroup = computed(() =>
    groups.value.find(g => g.id === activeGroupId.value) || groups.value[0]
  )

  const stats = ref({
    totalSaved: 65000,
    activeGroups: 5,
    nextContribution: 5,
    nextPayout: 5
  })

  function setActiveGroup(id) {
    activeGroupId.value = id
  }

  return {
    groups,
    activeGroupId,
    activeGroup,
    stats,
    setActiveGroup
  }
})
