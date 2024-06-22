import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            "plugins": [
                [
                    "i18next-extract",
                    {
                      locales: ["ru", "en"],
                      keyAsDefaultValue: true,
                      defaultNS: "translation",
                      outputPath: "locales/{{locale}}/{{ns}}.json",
                      discardOldKeys: true,
                    }
                ]
            ]
          }
        }
      }

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }

    const fileLoader = {
        test: /\.(png|jpg|gif|woff2|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                    },
                }
            },
            'sass-loader',
        ]
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }


    return [
        svgLoader,
        fileLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ]
}
