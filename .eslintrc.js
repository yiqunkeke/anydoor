module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'parser': 'babel-eslint',
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'no-console': 'off',
        // 未使用的变量
        'no-unused-vars': 'warn',
        // 分号
        'semi':['warn','always'],
        'semi-spacing': ['error', {'before': false, 'after': true}],
        'no-extra-semi': 'warn',
        // 引号
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        // 函数
        'space-before-function-paren': ['warn', 'always'],
        // 要求箭头函数的箭头之前或之后有空格
        'arrow-spacing': ['warn', { "before": true, "after": true }]
    }
};
