var vue = require('vue-loader')
var webpack = require('webpack')
// var path = require('path');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// var ignoreFiles = new webpack.IgnorePlugin(/\.\/jquery-last.js$/);//忽略打包文件

module.exports = {
  entry: './src/main.js',
  output: {
    path: './static',
    publicPath: '/static/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|node_modules\/dist|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // 用 ! 来连接多个人 loader
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // 内联 base64 URLs, 限定 <=10k 的图片, 其他的用 URL
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=10000&name=build/assets/image/[name].[ext]'}
      // { test: /\.(png|jpg|gif)$/, loader: 'file?name=[name].[ext]?[hash]'}
    ]
  },
  // plugins: [commonsPlugin],
  // plugins: [ignoreFiles],
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'//这个可以使jquery变成全局变量，不用在自己文件require('jquery')了
    })//,
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')//这是第三方库打包生成的文件
  ],
  // resolve: {
    //查找module的话从这里开始查找
    // root: 'E:/Workspaces/something/src/libs', //绝对路径
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    // extensions: ['', '.js', '.json', '.scss'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    // alias: {
    //     layer : '../src/libs/layer-2.1/layer/layer.js'//后续直接 require('Layer') 即可
    // }
  // },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devtool: '#source-map',
  devServer: {
    hot: true,
    inline: true,
    //其实很简单的，只要配置这个参数就可以了
    proxy: {
      '/scgl/*': {
        target: 'http://127.0.0.1:9090/',
        secure: false
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}