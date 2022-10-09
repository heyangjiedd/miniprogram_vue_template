<script setup>
  import { onBeforeMount, ref, watch } from 'vue';
  import styles from './index.module.scss';
  const props = defineProps(['fetchApi', 'params']);
  const hasMore = ref(true);
  const pageNo = ref(1);
  const list = ref([]);
  const loadMore = async (done) => {
    const { records = [], current, pages } = await props.fetchApi({
      pageNo: pageNo.value + 1,
      pageSize: 10,
      ...props.params,
    });
    list.value = [...list.value, ...records];
    pageNo.value = current;
    if (pages === current) hasMore.value = false;
    done();
  };

  const resetFetch = () => {
    pageNo.value = 1;
    props.fetchApi({ ...props.params }).then(({ records }) => {
      list.value = records || [];
    });
  };

  watch(() => props.params, resetFetch);

  onBeforeMount(() => {
    resetFetch();
  });
</script>

<template>
  <view :class="styles.index">
    <view id="header" :class="styles.header">
      <slot name="header"></slot>
    </view>
    <view id="list" :class="styles.list">
      <nut-infiniteloading :has-more="hasMore" @load-more="loadMore" load-icon="loading">
        <view v-for="(item, index) in list" :key="index"><slot name="item" :data="item"></slot></view>
      </nut-infiniteloading>
    </view>
    <view id="footer" :class="styles.footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>
