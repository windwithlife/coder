'use strict';
let path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//let defaultSettings = require('./defaults');

let additionalPaths = [];
let srcPath = path.join(__dirname, '/../resources/');
module.exports = {

  //port: 5389,
  //debug: true,
  entry: {
    app :[path.join(__dirname,'../resources/client/product/router.js')],
  },
  output: {
      path: path.join(__dirname, '../dist/'),
      publicPath: '/',
      filename: '[name].js' // 注意我们使用了变量
  },

  plugins:[
     new HtmlWebpackPlugin({
           template:'./index.html',    //html模板路径
           inject:true,    //允许插件修改哪些内容，包括head与body
           hash:true,      //为静态资源生成hash值
    })
  ],
  resolve: {
      extensions: ['','.web.js', '.js', '.jsx','.json'],
      alias: {
          modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
         AppStore : 'js/stores/AppStores.js',
         ActionType : 'js/actions/ActionType.js',
         AppAction : 'js/actions/AppAction.js',
          "load-image": 'blueimp-load-image/js/load-image',
          "load-image-meta": 'blueimp-load-image/js/load-image-meta',
          "load-image-exif":'blueimp-load-image/js/load-image-exif',
          "jquery-ui/widget":'jquery-ui/ui/widget'
        }
  },
  externals: {
      //'react': 'React',
      //'react-dom': 'ReactDOM',
      //'react-router':'ReactRouter',
      //'amazeui-touch': 'AMUITouch',
      //'axios': 'axios',
      //'react-addons-css-transition-group':
      //  ['React', 'addons', 'CSSTransitionGroup']
  },
  module :{

      loaders: [
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader'
      },

      {
          test: /\.scss/,
          loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      {
          test: /\.less/,
          loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
          test: /\.styl/,
          loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
          test: /\.(png|jpg|gif|woff|woff2)$/,
          loader: 'url-loader?limit=8192'
      },
      {
          test: /\.(ttf|mp4|ogg|svg)$/,
          loader: 'file-loader'
      },
      {
         test: /\.jsx?$/,
          loader: 'babel-loader',

          //query: {
          //      presets: ['es2015', 'react', 'stage-1']//先后顺序不能错,否则有些语法转换会报错
          //},
         exclude: /node_modules/,
          include:[path.join(__dirname,"/../resources/")]
      }
    ]
  },
};
