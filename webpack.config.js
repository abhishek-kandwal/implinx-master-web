const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  // Load environment variables from .env if present
  const envPath = path.resolve(__dirname, '.env');
  const fileEnv = fs.existsSync(envPath) ? dotenv.parse(fs.readFileSync(envPath)) : {};
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  // Also bridge any system environment variables starting with REACT_APP_
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('REACT_APP_')) {
      envKeys[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
  });

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
      publicPath: '/',
      clean: true
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[name].[hash:8][ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.svg',
        inject: true
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: isProduction ? 'production' : 'development',
          REACT_APP_SUPABASE_URL: fileEnv.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || '',
          REACT_APP_SUPABASE_ANON_KEY: fileEnv.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || '',
          REACT_APP_PADDLE_VENDOR_ID: fileEnv.REACT_APP_PADDLE_VENDOR_ID || process.env.REACT_APP_PADDLE_VENDOR_ID || '',
          REACT_APP_RAZORPAY_KEY_ID: fileEnv.REACT_APP_RAZORPAY_KEY_ID || process.env.REACT_APP_RAZORPAY_KEY_ID || '',
          REACT_APP_STRIPE_PUBLISHABLE_KEY: fileEnv.REACT_APP_STRIPE_PUBLISHABLE_KEY || process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
          REACT_APP_BILLING_PROVIDER: fileEnv.REACT_APP_BILLING_PROVIDER || process.env.REACT_APP_BILLING_PROVIDER || 'stripe',
          ...fileEnv
        }),
        'process': JSON.stringify({
          env: {
            NODE_ENV: isProduction ? 'production' : 'development',
            REACT_APP_SUPABASE_URL: fileEnv.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || '',
            REACT_APP_SUPABASE_ANON_KEY: fileEnv.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || '',
            REACT_APP_PADDLE_VENDOR_ID: fileEnv.REACT_APP_PADDLE_VENDOR_ID || process.env.REACT_APP_PADDLE_VENDOR_ID || '',
            REACT_APP_RAZORPAY_KEY_ID: fileEnv.REACT_APP_RAZORPAY_KEY_ID || process.env.REACT_APP_RAZORPAY_KEY_ID || '',
            REACT_APP_STRIPE_PUBLISHABLE_KEY: fileEnv.REACT_APP_STRIPE_PUBLISHABLE_KEY || process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
            REACT_APP_BILLING_PROVIDER: fileEnv.REACT_APP_BILLING_PROVIDER || process.env.REACT_APP_BILLING_PROVIDER || 'stripe',
            ...fileEnv
          }
        })
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: 'static/css/[name].[contenthash:8].css'
            })
          ]
        : [])
    ],
    devServer: {
      port: 3000,
      historyApiFallback: {
        index: '/index.html',
        disableDotRule: true
      },
      hot: true,
      open: false,
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/'
      },
      devMiddleware: {
        publicPath: '/'
      },
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      }
    },
    performance: {
      hints: false
    }
  };
};
