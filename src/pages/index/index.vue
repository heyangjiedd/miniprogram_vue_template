<script setup>
  import List from '@/components/List';
  const fetchApi = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };
</script>

<template>
  <List :fetchApi="fetchApi">
    <template #header>
      <div>header</div>
    </template>
    <template #item="{data}">
      <div>{{ data }}</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </List>
</template>
