const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.tsx'
  },
  resolve: {
	// Add '.ts' and '.tsx' as resolvable extensions.
	extensions: [".ts", ".tsx", ".js", ".json"]
},
   plugins: [
     new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
	   title: 'Production',
	   template: './index.html'
    })
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   },

   module: {
	rules: [
		// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
		{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
    { test: /\.less?$/, loaders: [{
      loader: "style-loader" // creates style nodes from JS strings 
  }, {
      loader: "css-loader" // translates CSS into CommonJS 
  }, {
      loader: "less-loader" // compiles Less to CSS 
  }] },
    { test: /\.css?$/, loaders: ["style-loader","css-loader"] },
    {
      test: /\.(jpe?g|png|gif)$/i,   //to support eg. background-image property 
      loader:"file-loader",
      query:{
        name:'[name].[ext]',
        outputPath:'images/'
        //the images will be emmited to public/assets/images/ folder 
        //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
      }
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule 
      loader: "url-loader",
      query:{
        limit:'10000',
        name:'[name].[ext]',
        outputPath:'fonts/'
        //the fonts will be emmited to public/assets/fonts/ folder 
        //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }  
      }
    },
    {
      test: /\.scss$/,
      loaders: ["style-loader","css-loader","sass-loader"]
    },

		// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
		{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
	]
},

// When importing a module whose path matches one of the following, just
// assume a corresponding global variable exists and use that instead.
// This is important because it allows us to avoid bundling all of our
// dependencies, which allows browsers to cache those libraries between builds.
// externals: {
// 	"react": "React",
// 	"react-dom": "ReactDOM"
// }
 };