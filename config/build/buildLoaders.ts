import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { BuildCSSLoader } from './loaders/BuildCSSLoader';
import { BuildBabelLoader } from './loaders/BuildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const codeBabelLoader = BuildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = BuildBabelLoader({ ...options, isTsx: true });

    const cssLoader = BuildCSSLoader(isDev);

    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

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
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader,
        mjsLoader,
    ];
}
