const PostCSSPlugin = require('eleventy-plugin-postcss');

module.exports = function (config) {
    config.addPassthroughCopy('src/fonts/*.woff2');
    config.addPassthroughCopy('src/styles');
    config.addPassthroughCopy('src/scripts');
    config.addPassthroughCopy(
        'src/**/*.(html|jpg|png|webp|avif|ico|svg|mp4|xml)',
    );
    config.addPassthroughCopy('src/(robots|humans).txt');

    // Collections
    config.addCollection('test', () => {
        return [1, 2];
    });

    // Filters
    config.addFilter('sortByDate', (array) => {
        return sortByDate(array);
    });

    function sortByDate(array, dateField = 'pubDate') {
        return [...array].sort(
            (a, b) =>
                new Date(a[dateField]).getTime() -
                new Date(b[dateField]).getTime(),
        );
    }

    config.addFilter('limit', (array, limit) => {
        return array.slice(0, limit);
    });

    // Markdown config
    let markdownIt = require('markdown-it');
    let options = {
        html: true,
        typographer: true,
    };
    config.setLibrary('md', markdownIt(options).disable('code'));

    // Plugins
    config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
        templateFormats: ['njk', 'md'],
        trim: true,
    });

    // TODO: подключить минимизацию HTML
    config.addPlugin(PostCSSPlugin);

    return {
        dir: {
            input: 'src',
            output: '_public', // TODO: сборка для GH Pages
            includes: 'includes',
            layouts: 'layouts',
            data: 'data',
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        templateFormats: ['md', 'njk'],
    };
};
