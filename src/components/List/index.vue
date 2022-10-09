<script setup>
  import { onBeforeMount, onMounted, ref } from 'vue';
  import styles from './index.module.scss';
  const props = defineProps(['fetchApi']);
  const hasMore = ref(true);
  const pageNo = ref(1);
  const list = ref([]);
  const loadMore = async (done) => {
    const { records = [], current, pages } = await props.fetchApi({ pageNo: pageNo.value + 1, pageSize: 10 });
    list.value = [...list.value, ...records];
    pageNo.value = current;
    if (pages === current) hasMore.value = false;
    done();
  };
  onBeforeMount(() => {
    props.fetchApi().then(({ records }) => {
      list.value = records || [];
    });
  });
</script>

<template>
  <view :class="styles.index">
    <view id="header" :class="styles.header">
      <slot name="header"></slot>
    </view>
    <view id="list" :class="styles.list">
      <view v-for="(item, index) in list" :key="index"><slot name="item" :data="item"></slot></view>
      <nut-infiniteloading :has-more="hasMore" @load-more="loadMore" load-icon="loading">
        <view v-for="(item, index) in list" :key="index"><slot name="item" :data="item"></slot></view>
      </nut-infiniteloading>
    </view>
    <view id="footer" :class="styles.footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>
