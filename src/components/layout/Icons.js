import { h } from 'vue'

export const HomeIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M9 22V12h6v10', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const WalletIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M21 12V7H5a2 2 0 0 1 0-4h14v4', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M3 5v14a2 2 0 0 0 2 2h16v-5', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M18 12a2 2 0 0 0 0 4h4v-4h-4z', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const UsersIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('circle', { cx: '9', cy: '7', r: '4', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const CreditCardIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('rect', { x: '1', y: '4', width: '22', height: '16', rx: '2', ry: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M1 10h22', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const BookOpenIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const ClockIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('circle', { cx: '12', cy: '12', r: '10', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M12 6v6l4 2', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const BarChartIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M18 20V10M12 20V4M6 20v-6', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const UserIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('circle', { cx: '12', cy: '7', r: '4', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const BriefcaseIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2', ry: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const GiftIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const SettingsIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('circle', { cx: '12', cy: '12', r: '3', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const HeadphonesIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M3 18v-6a9 9 0 0 1 18 0v6', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const SearchIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('circle', { cx: '11', cy: '11', r: '8', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M21 21l-4.35-4.35', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const BellIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const MessageIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const ChevronDownIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M6 9l6 6 6-6', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const MapPinIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('circle', { cx: '12', cy: '10', r: '3', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const SendIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const ArrowLeftIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M19 12H5M12 19l-7-7 7-7', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const MoreVerticalIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('circle', { cx: '12', cy: '12', r: '1', fill: 'currentColor' }),
  h('circle', { cx: '12', cy: '5', r: '1', fill: 'currentColor' }),
  h('circle', { cx: '12', cy: '19', r: '1', fill: 'currentColor' })
])

export const CheckIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M20 6L9 17l-5-5', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const PlusIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M12 5v14M5 12h14', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const HelpCircleIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('circle', { cx: '12', cy: '12', r: '10', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const AwardIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('circle', { cx: '12', cy: '8', r: '7', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('path', { d: 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const LogOutIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('polyline', { points: '16 17 21 12 16 7', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('line', { x1: '21', y1: '12', x2: '9', y2: '12', strokeLinecap: 'round', strokeLinejoin: 'round' })
])

export const XIcon = (props) => h('svg', { ...props, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }, [
  h('line', { x1: '18', y1: '6', x2: '6', y2: '18', strokeLinecap: 'round', strokeLinejoin: 'round' }),
  h('line', { x1: '6', y1: '6', x2: '18', y2: '18', strokeLinecap: 'round', strokeLinejoin: 'round' })
])
