import { MenuItemType } from '@/types/menu'

export const MENU_ITEMS: MenuItemType[] = [
  // ====================MAIN===============
  {
    key: 'main',
    label: 'MAIN',
    isTitle: true,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'mingcute:home-3-line',
    url: '/dashboard',
  },

  // ====================CONTENT===============
  {
    key: 'content-title',
    label: 'CONTENT',
    isTitle: true,
  },
  {
    key: 'content',
    label: 'Content',
    icon: 'mingcute:file-line',
    children: [
      {
        key: 'blog',
        label: 'Blog',
        url: '/content/blog',
        parentKey: 'content',
      },
      {
        key: 'projects',
        label: 'Projects',
        url: '/content/projects',
        parentKey: 'content',
      },
      {
        key: 'pages',
        label: 'Pages',
        url: '/content/pages',
        parentKey: 'content',
      },
      {
        key: 'media',
        label: 'Media Library',
        url: '/content/media',
        parentKey: 'content',
      },
      {
        key: 'testimonials',
        label: 'Testimonials',
        url: '/content/testimonials',
        parentKey: 'content',
      },
      {
        key: 'services',
        label: 'Services',
        url: '/content/services',
        parentKey: 'content',
      },
    ],
  },

  // ====================CRM===============
  {
    key: 'crm-title',
    label: 'CRM',
    isTitle: true,
  },
  {
    key: 'leads',
    label: 'Leads',
    icon: 'mingcute:user-add-line',
    url: '/crm/leads',
  },
  {
    key: 'quotes',
    label: 'Quotes',
    icon: 'mingcute:document-2-line',
    url: '/crm/quotes',
  },

  // ====================ANALYTICS===============
  {
    key: 'analytics-title',
    label: 'ANALYTICS',
    isTitle: true,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: 'mingcute:chart-bar-line',
    children: [
      {
        key: 'analytics-overview',
        label: 'Overview',
        url: '/analytics',
        parentKey: 'analytics',
      },
      {
        key: 'marketing-events',
        label: 'Marketing Events',
        url: '/analytics/events',
        parentKey: 'analytics',
      },
    ],
  },

  // ====================SYSTEM===============
  {
    key: 'system-title',
    label: 'SYSTEM',
    isTitle: true,
  },
  {
    key: 'users',
    label: 'Users',
    icon: 'mingcute:user-setting-line',
    url: '/system/users',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'mingcute:settings-3-line',
    url: '/settings',
  },
]
