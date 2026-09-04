<template>
  <div class="py-4">
    <p class="text-[36px] font-bold">
      Technical <span class="text-primary">Mastery</span>
    </p>
    <div class="grid grid-cols-12 gap-4 mt-4 w-full">
      <div
        v-for="tech in techMastery"
        :key="tech.id"
        class="w-full xs:col-span-12 sm:col-span-6 md:col-span-4"
      >
        <UCard>
          <template #header>
            <img :src="tech.image" alt="tech.name" />
          </template>

          <h3 class="text-[24px] font-bold text-primary">{{ tech.name }}</h3>
          <p class="text-[16px] text-muted-foreground">
            {{ tech.description[locale] }}
          </p>

          <template #footer>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in tech.tags"
                :key="tag"
                color="neutral"
                variant="outline"
                >{{ tag }}</UBadge
              >
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const { techMastery, loading, getTechMastery } = useTechMastery();

await getTechMastery();
</script>
