const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// to clean or remove build folder
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
// plugin for loading css files This plugin extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// for minimizing css files
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
    // entry point
    entry:path.resolve(__dirname,'./src/js/index.js'),
    output:{
        filename:'script.bundle.js',
        path:path.resolve(__dirname,'./build')

    },
    mode:'development',
    devtool: 'inline-source-map',
    module:{
        // to use loaders 
        rules:[
            // css loader
            //1- test regular exp
            {test:/\.css$/i, 
                // loader of css 
                // This plugin extracts CSS into separate files
          //  MiniCssExtractPlugin.loader.loader or 'style loader' to Inject CSS into the DOM
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
              //for images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                },
                {
                    // to minimize images
                    loader: ImageMinimizerPlugin.loader,
                    options: {
                         // Ignore errors on corrupted images
                        severityError: 'warning',

                        minimizerOptions: {
                            plugins: ['gifsicle', ['mozjpeg', { quality: 60 }], 'svgo', 'optipng']
                        },
                    },
                },
                ]
            },
            // for sass files
            { test: /\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader'] },

        ]
    },
    plugins:[
          // create html
          new HtmlPlugin({ title:'output',filename:'index.html', inject: 'body' }),
          // css
          new CleanWebpackPlugin(),
          new MiniCssExtractPlugin()
    ],
    optimization:{ minimize: true,
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          `...`,
          //or for prevent create LICENSE.txt file
          new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false,
        }),
          new CssMinimizerPlugin(),
        ],}
}

