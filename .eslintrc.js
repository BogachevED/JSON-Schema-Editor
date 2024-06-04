module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "prettier/prettier": "off",
        "vue/multi-word-component-names": 'off',
        "vue/no-reserved-component-names": "warn",
        "no-console" : "off",
        "no-debugger" : "off",
        "no-tabs" : "off",
        "indent" : "off",
        "quote-props" : "off"
    }
}
