module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 19.2, // 根据你的设计稿调整（设计稿宽度/10）
      propList: ['*'], // 转换所有属性
      selectorBlackList: [/^html$/], // 不处理 html 的字体大小
      minPixelValue: 2, // 最小转换像素值
    },
  },
}
