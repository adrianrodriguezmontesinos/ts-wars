module.exports = {
    semi: true,
    singleQuote: true,
    trailingComma: "all",
    printWidth: 100,
    tabWidth: 2,
    bracketSpacing: true,
    arrowParens: "always",

    overrides: [
        {
            files: "*.scss",
            options: {
                parser: "scss",
                singleQuote: false,
            },
        },
        {
            files: "*.html",
            options: {
                parser: "html",
                htmlWhitespaceSensitivity: "ignore",
            },
        },
    ],
};
