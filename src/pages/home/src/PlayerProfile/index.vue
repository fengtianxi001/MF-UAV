<template>
  <BasePanel>
    <div class="container">
      <div class="profile-avatar"></div>
      <div class="profile-info">
        <span class="info-name">fengtianxi001</span>
        <span class="info-sex">♂</span>
      </div>
      <div class="profile-detail">
        <div class="detail-item" v-for="item in sources">
          <span class="detail-item-label">{{ item.name }}:</span>
          <span class="detail-item-value">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { BasePanel } from '@/components'

const sources = [
  {
    name: '岗位',
    value: '前端开发工程师',
  },
  {
    name: '行业经验',
    value: '5年',
  },
  {
    name: '编号',
    value: '#1c55e1d88e7b',
  },
  {
    name: '执照到期时间',
    value: '2030-01-01',
  },
  {
    name: '状态',
    value: '已授权',
  },
  {
    name: '牌照种类',
    value: 'UTC',
  },
  {
    name: '语言',
    value: '中文(熟练)',
  },
]
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-avatar {
    width: 50px;
    height: 50px;
    margin-top: 20px;
    background-image: url(@/assets/images/avatar.png);
    background-size: cover;
    border-radius: 50%;
  }
  .profile-info {
    position: relative;
    display: flex;
    margin-top: 8px;
    font-size: 12px;
    .info-name {
      font-family: Dincoros;
      font-size: 18px;
    }
    .info-sex {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      margin-left: 4px;
      font-size: 10px;
      color: #fff;
      background-color: #165dff;
      border-radius: 50%;
    }
  }
  .profile-detail {
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    margin-top: 25px;
    .detail-item {
      display: flex;
      font-size: 13px;
      line-height: 25px;
      .detail-item-label {
        width: 45%;
        color: var(--color-text-2);
      }
      .detail-item-value {
        width: 50%;
      }
    }
  }
}
</style>
