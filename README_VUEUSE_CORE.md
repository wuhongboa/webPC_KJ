<!--
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-06-23 09:15:43
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-06-23 10:34:21
 * @FilePath: \newGit\VUEUSE_CORE_README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

1. 官方地址：<a href="https://vueuse.nodejs.cn/">https://vueuse.nodejs.cn/</a>

2. useStorage: 状态管理,自动同步 localStorage/sessionStorage

3. useElementBounding: 获取元素尺寸和位置
   ```
   const target = ref<HTMLElement>()
   const { width, height } = useElementBounding(target)
   ```
4. useMouse: 追踪鼠标位置

```
const { x, y } = useMouse()
```

5. debouncedRef/useThrottle: 防抖/节流

```
//防抖
const search = debouncedRef('', 500)
//节流
const throttledFn = useThrottle(() => {
  console.log('Throttled!')
}, 1000)
```

6. useClipboard: 剪贴板操作

7. useNow: 响应式当前时间

```
const now = useNow() // 自动更新
```

8. onClickOutside: 监听元素外部的点击。对于模态或下拉菜单很有用。

9. useMagicKeys: 反应式按键按下状态，具有神奇按键组合支持。

10. useScroll: 反应式滚动位置和状态。

```
const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
```

11. useElementSize: HTML 元素的反应式大小

12. useIntersectionObserver: 检测目标元素的可见性

13. useWindowSize: 反应式窗口大小

14. useFullscreen: 全屏

```
const { isFullscreen, enter, exit, toggle } = useFullscreen(el)
```
