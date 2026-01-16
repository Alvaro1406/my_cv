import { createSharedComposable } from "@vueuse/core";
import type { NavigationMenuItem } from "@nuxt/ui";

const _useDashboard = () => {
  /** Define route propertie */
  const route = useRoute();

  // Properties
  const open = ref(false);
  const showNotifications = ref(false);

  // Links to menu
  const links = [
    [
      {
        label: "Inicio",
        icon: "i-lucide-house",
        to: "/admin",
        onSelect: () => {
          open.value = false;
        },
      },
      {
        label: "Mensajes",
        icon: "i-lucide-inbox",
        to: "/admin/inbox",
        badge: "4",
        onSelect: () => {
          open.value = false;
        },
      },
      {
        label: "Ajustes",
        to: "/admin/settings",
        icon: "i-lucide-settings",
        defaultOpen: true,
        type: "trigger",
        children: [
          {
            label: "General",
            to: "/admin/settings",
            exact: true,
            onSelect: () => {
              open.value = false;
            },
          },
          {
            label: "Seguridad",
            to: "/admin/settings/security",
            onSelect: () => {
              open.value = false;
            },
          },
        ],
      },
    ],
  ] satisfies NavigationMenuItem[][];

  // Groups for search
  const groups = computed(() => [
    {
      id: "links",
      label: "Ir para...",
      items: links.flat(),
    },
  ]);

  /** Name according to the route to display in the navbar */
  const nameView = computed(() => {
    switch (route.name) {
      case "admin":
        return "Inicio";
        break;
      case "admin-inbox":
        return "Mensajes de contacto";
        break;
      case "admin-settings":
        return "Ajustes generales";
        break;
      case "admin-settings-security":
        return "Ajustes de seguridad";
        break;
      default:
        break;
    }
  });

  /**
   * Shortcuts
   */
  defineShortcuts({
    n: () => (showNotifications.value = !showNotifications.value),
  });

  return {
    open,
    links,
    groups,
    nameView,
    showNotifications,
  };
};

export const useDashboard = createSharedComposable(_useDashboard);
