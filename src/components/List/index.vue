<script setup>
  import { ref } from 'vue';
  import styles from './index.module.scss';
  const props = defineProps(['fetchApi']);
  const hasMore = ref(true);
  const list = ref(new Array(30).fill(0));
  const loadMore = async (done) => {
    const res = await props.fetchApi();
    const curLen = list.value.length;
    for (let i = curLen; i < curLen + 10; i++) {
      list.value.push(`${i}`);
    }
    if (list.value.length > 50) hasMore.value = false;
    done();
  };
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
