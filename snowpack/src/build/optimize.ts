import { OptimizeOptions } from "../types/snowpack";

// export type BundleStrategy = 'load-efficiency' | 'cache-efficiency' | 'all' /* | ... */;
// export interface OptimizeOptions {
//     entrypoints: 'auto' | string[]; /* should this live here, or somewhere else? */
//     minifyJs: boolean;
//     minifyCss: boolean;
//     minifyHtml: boolean;
//     preload: boolean;
//     target: 'es2020' | 'es2019' | 'es2018' | 'es2017'; 
//     polyfill: 'es2020' | 'es2019' | 'es2018' | 'es2017' | string | boolean;
//     bundle: boolean | BundleStrategy | {
//         strategy: BundleStrategy;
//         bundleSource: boolean;
//         bundleDependencies: boolean;
//         bundleDynamicImports: boolean;
//     };
// }

export async function runBuiltInOptimize(options?: OptimizeOptions) {
    if (!options) {
        return;
    }

    // 1. scan directory for entrypoints, if needed (or use given)
    // 1. scan directory to create import graph (begin manifest)
    // 1. optimize all files in parallel (minify, target)
        // 1. add polyfill imports, if needed
    // 1. bundle! (update manifest)
    // 1. delete bundled source assets
    // 1. if preload, add preload tags to HTML or JS entrypoints
    // 1. save manifest to disk

    return;
}