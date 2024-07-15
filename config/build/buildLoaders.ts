import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { BuildCSSLoader } from './loaders/BuildCSSLoader';
import { BuildBabelLoader } from './loaders/BuildBabelLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = BuildBabelLoader(isDev);

    const cssLoader = BuildCSSLoader(isDev);

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const mjsLoader = {
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false,
        },
    };

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
        mjsLoader,
    ];
}
