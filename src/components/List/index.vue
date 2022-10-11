<script setup>
  import { onBeforeMount, ref, watch } from 'vue';
  import styles from './index.module.scss';
  const PAGE_NO = 10;
  const props = defineProps(['fetchApi', 'params']);
  let hasMore = ref(true);
  let pageNo = ref(1);
  let list = ref([]);
  const loadMore = async (done) => {
    const { records = [], current, pages } = await props.fetchApi({
      pageNo: pageNo + 1,
      pageSize: PAGE_NO,
      ...props.params,
    });
    list = [...list, ...records];
    pageNo = current;
    if (pages === current) hasMore = false;
    done();
  };
  // 重置查询
  const resetFetch = async (pageSize = PAGE_NO) => {
    pageNo = 1;
    hasMore = true;
    const { records = [], current, pages } = await props.fetchApi({ ...props.params, pageNo, pageSize });
    list = records || [];
    if (pages === current) hasMore = false;
  };
  // 刷新数据
  const refresh = () => resetFetch(pageNo * PAGE_NO);

  watch(
    () => props.params,
    () => resetFetch(),
  );

  onBeforeMount(() => {
    resetFetch();
  });

  defineExpose({ refresh });
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
