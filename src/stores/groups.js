import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGroupsStore = defineStore('groups', () => {
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
      nextPayoutRecipient: 'Chidi Okonkwo'
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
      nextPayoutRecipient: 'Amaka Johnson'
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
      nextPayoutRecipient: 'Tunde Bakare'
    },
    {
      id: 4,
      name: '9-5 to Freedom',
      avatar: 'https://i.pravatar.cc/150?img=4',
      members: 10,
      contributionAmount: 75000,
      frequency: 'bi-weekly',
      progress: 60,
      hasNotification: false,
      nextPayout: '2026-04-28',
      nextPayoutRecipient: 'Ngozi Eze'
    },
    {
      id: 5,
      name: 'Money Moves',
      avatar: 'https://i.pravatar.cc/150?img=5',
      members: 20,
      contributionAmount: 25000,
      frequency: 'weekly',
      progress: 85,
      hasNotification: true,
      nextPayout: '2026-04-24',
      nextPayoutRecipient: 'Kunle Adeyemi'
    },
    {
      id: 6,
      name: 'Village Vault',
      avatar: 'https://i.pravatar.cc/150?img=6',
      members: 6,
      contributionAmount: 150000,
      frequency: 'monthly',
      progress: 40,
      hasNotification: false,
      nextPayout: '2026-05-05',
      nextPayoutRecipient: 'Blessing Okoro'
    }
  ])

  const activities = ref([
    {
      id: 1,
      type: 'payout',
      user: 'Chidi',
      avatar: 'https://i.pravatar.cc/150?img=7',
      amount: 800000,
      group: null,
      time: '9:50 AM',
      emoji: '🎉'
    },
    {
      id: 2,
      type: 'contribution',
      user: 'You',
      avatar: 'https://i.pravatar.cc/150?img=12',
      amount: 50000,
      group: 'Family Oyesu',
      time: '9:38 AM',
      emoji: null
    },
    {
      id: 3,
      type: 'invite',
      user: null,
      avatar: 'https://i.pravatar.cc/150?img=8',
      amount: null,
      group: 'Diaspora Circle Lagos',
      time: '9:35 AM',
      emoji: null
    },
    {
      id: 4,
      type: 'contribution',
      user: 'You',
      avatar: 'https://i.pravatar.cc/150?img=12',
      amount: 100000,
      group: 'Family Oyesu',
      time: '8:45 AM',
      emoji: null
    },
    {
      id: 5,
      type: 'payout',
      user: 'Chidi',
      avatar: 'https://i.pravatar.cc/150?img=7',
      amount: 800000,
      group: null,
      time: '8:30 AM',
      emoji: '🎉'
    }
  ])

  const stats = ref({
    totalSaved: 65000,
    activeGroups: 5,
    nextContribution: 5,
    nextPayout: 5
  })

  return {
    groups,
    activities,
    stats
  }
})
