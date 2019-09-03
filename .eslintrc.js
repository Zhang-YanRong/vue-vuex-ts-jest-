module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parserOptions: {
        parser: 'babel-eslint'
    },
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
        browser: true,
    },
    // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],


    // add your custom rules here
    rules: {
        // 回调错误处理
        'handle-callback-err': ["error", "error"],
        //大括号两侧必须带有空格
        'object-curly-spacing': ["error", "always", { "arraysInObjects": true }],
        //允许无箭头箭头功能
        'arrow-parens': 0,
        'no-extra-semi': "off",
        // 'semi-style': ["error", "last"],
        //js每行后面加；  不加分号'semi': ["error", "always"],
        'semi': ["error", "always"],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'eol-last': 0,//这句话表示在文件末尾可以不加回车，贴个链接 https://eslint.org/docs/rules/eol-last
        'space-before-function-paren': 0, //这句话表示在函数后可以不加空格,
        // 三等号
        'eqeqeq': 0,
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': 0,
        // 关键字后面使用一致的空格
        'keyword-spacing': 0,
        // 强制在 function的左括号之前使用一致的空格
        // 'space-before-function-paren': 0,
        // 引号类型
        "quotes": [2, "single"],
        // 禁止出现未使用过的变量
        // 'no-unused-vars': 0,
        // 要求或禁止末尾逗号
        // 'comma-dangle': ,
        "parser": "babel-eslint"
    }
};