<script setup>
  const props = defineProps(['label', 'value']);
</script>

<template>
  <view class="mb-10 fs-15"
    ><text class="cl-black fw-6">{{ props.label }}：</text
    ><text v-if="props.value" class="cl-gray-7b">{{ props.value }}</text></view
  >
</template>
