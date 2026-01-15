import type { IUser } from "~~/types/user";
import type { DropdownMenuItem } from "@nuxt/ui";

export const useMenuUser = () => {
  const colorMode = useColorMode();
  const appConfig = useAppConfig();

  const { colors, neutrals } = useColors();

  const { logout } = useAuth();

  const user = computed<IUser>(() => {
    if (import.meta.client) {
      const data: string | null | IUser = localStorage.getItem("user");
      return JSON.parse(data as string) as IUser;
    } else {
      return {} as IUser;
    }
  });

  const items = computed<DropdownMenuItem[][]>(() => [
    [
      {
        type: "label",
        label: user.value.firstName + " " + user.value.lastName,
        avatar: {
          src: user.value.image,
          alt: user.value.firstName + " " + user.value.lastName,
        },
      },
    ],
    [
      {
        label: "Perfil",
        icon: "i-lucide-user",
      },
    ],
    [
      {
        label: "Apariencia",
        icon: "i-lucide-palette",
        children: [
          {
            label: "Primario",
            slot: "chip",
            chip: appConfig.ui.colors.primary,
            content: {
              align: "center",
              collisionPadding: 16,
            },
            children: colors.map((color) => ({
              label: color,
              chip: color,
              slot: "chip",
              checked: appConfig.ui.colors.primary === color,
              type: "checkbox",
              onSelect: (e) => {
                e.preventDefault();

                appConfig.ui.colors.primary = color;
              },
            })),
          },
          {
            label: "Neutral",
            slot: "chip",
            chip:
              appConfig.ui.colors.neutral === "neutral"
                ? "old-neutral"
                : appConfig.ui.colors.neutral,
            content: {
              align: "end",
              collisionPadding: 16,
            },
            children: neutrals.map((color) => ({
              label: color,
              chip: color === "neutral" ? "old-neutral" : color,
              slot: "chip",
              type: "checkbox",
              checked: appConfig.ui.colors.neutral === color,
              onSelect: (e) => {
                e.preventDefault();

                appConfig.ui.colors.neutral = color;
              },
            })),
          },
        ],
      },
      {
        label: "Tema",
        icon: "i-lucide-sun-moon",
        children: [
          {
            label: "Light",
            icon: "i-lucide-sun",
            type: "checkbox",
            checked: colorMode.value === "light",
            onSelect(e: Event) {
              e.preventDefault();

              colorMode.preference = "light";
            },
          },
          {
            label: "Dark",
            icon: "i-lucide-moon",
            type: "checkbox",
            checked: colorMode.value === "dark",
            onUpdateChecked(checked: boolean) {
              if (checked) {
                colorMode.preference = "dark";
              }
            },
            onSelect(e: Event) {
              e.preventDefault();
            },
          },
        ],
      },
    ],
    [
      {
        label: "Cerrar sesión",
        icon: "i-lucide-log-out",
        onSelect: async () => {
          /* Handle logout */
          await logout();
        },
      },
    ],
  ]);

  return {
    user,
    items,
  };
};
