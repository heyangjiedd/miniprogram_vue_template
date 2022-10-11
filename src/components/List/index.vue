<script setup>
  import { onBeforeMount, ref, watch } from 'vue';
  import styles from './index.module.scss';
  const props = defineProps(['fetchApi', 'params']);
  let hasMore = ref(true);
  let pageNo = ref(1);
  let list = ref([]);
  const loadMore = async (done) => {
    const { records = [], current, pages } = await props.fetchApi({
      pageNo: pageNo + 1,
      pageSize: 10,
      ...props.params,
    });
    list = [...list, ...records];
    pageNo = current;
    if (pages === current) hasMore = false;
    done();
  };

  const resetFetch = async () => {
    pageNo = 1;
    hasMore = true;
    const { records = [], current, pages } = await props.fetchApi({ ...props.params });
    list = records || [];
    if (pages === current) hasMore = false;
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
      <nut-infiniteloading
        :has-more="hasMore"
        @load-more="loadMore"
        load-icon="loading"
        load-more-txt="哎呀，没有更多数据啦"
      >
        <view v-for="(item, index) in list" :key="index"><slot name="item" :data="item"></slot></view>
      </nut-infiniteloading>
    </view>
    <view id="footer" :class="styles.footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>
