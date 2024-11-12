<template>
  <div 
    class="svg-icon" 
    :style="{ 
      width: size + 'px', 
      height: size + 'px',
      color: color 
    }"
  >
    <svg :class="className" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
  </div>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from 'vue'

interface Props {
  prefix?: string
  name: string
  color?: string
  size?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  size: 16,
  color: 'currentColor',
  className: ''
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>

<style scoped>
.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.svg-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style> 