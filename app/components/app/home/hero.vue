<template>
  <div
    class="flex xs:flex-col md:flex-row py-6 px-4 xs:gap-4 md:gap-12 w-full md:justify-center md:items-center"
  >
    <div class="flex flex-col gap-8 md:w-[60%]">
      <div class="w-full">
        <h3 class="text-[42px] font-bold">{{ $t("heroSection.title") }}</h3>
        <h3 class="text-[32px] font-bold text-primary">Alvaro Beruvides</h3>
      </div>
      <p class="text-[18px] text-muted-foreground text-justify">
        {{ $t("heroSection.subtitle") }}
      </p>
      <div>
        <buttonCmp :label="$t('heroSection.buttonText')" variant="solid" />
      </div>
    </div>
    <div class="flex md:justify-center md:items-center py-6 md:w-[40%]">
      <img
        src="~/assets/images/alvaro.webp"
        alt="Profile Picture"
        class="tb:w-[350px] tb:h-[350px] md:w-full md:h-full rounded-2xl shadow-xl/30 shadow-primary object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import buttonCmp from "~/components/components/buttonCmp.vue";
</script>
