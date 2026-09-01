<template>
  <div class="py-4">
    <p class="text-[36px] font-bold">
      Technical <span class="text-primary">Mastery</span>
    </p>
    <div class="flex xs:flex-col sm:flex-row gap-4 mt-4 w-full">
      <div v-for="tech in techMastery" :key="tech.id" class="w-full">
        <UCard>
          <template #header> Imagen </template>

          <h3 class="text-[24px] font-bold">{{ tech.name }}</h3>
          <p class="text-[14px] text-muted-foreground">
            {{ tech.description[locale] }}
          </p>

          <template #footer> Items </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const { techMastery, message, loading, getTechMastery } = useTechMastery();

await getTechMastery();
</script>
