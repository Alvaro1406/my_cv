<template>
  <div class="py-4">
    <p class="text-[36px] font-bold">
      Soft <span class="text-primary">Skills</span>
    </p>
    <div class="grid grid-cols-12 gap-4 mt-4 w-full">
      <div
        v-for="skill in softSkills"
        :key="skill.id"
        class="w-full xs:col-span-12 sm:col-span-6 md:col-span-4"
      >
        <UCard class="min-h-[250px]">
          <template #header>
            <img :src="skill.image" alt="skill.name" />
          </template>

          <h3 class="text-[24px] font-bold text-primary">{{ skill.name }}</h3>
          <p class="text-[16px] text-muted-foreground">
            {{ skill.description[locale] }}
          </p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const { softSkills, loading, getSoftSkills } = useSoftSkills();

await getSoftSkills();
</script>
