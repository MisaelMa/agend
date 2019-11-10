export default {
    env: {},
    head: {
        title: "agenda",
        meta: [
            {charset: "utf-8"},
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
            },
            {hid: "description", name: "description", content: "Nuxt.js TypeScript project"}
        ],
        link: [
            {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
            {
                rel: "stylesheet",
                type: "image/x-icon",
                href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
            },
            {rel: "stylesheet", type: "image/x-icon", href: "https://fonts.googleapis.com/css?family=Material+Icons"},
        ]
    },
    plugins: [
        {src: '@plugins/vuetify'},
        {src: '@plugins/ToastPush', mode: 'client'},
    ],
    loading: {color: "#3B8070"},
    css: [
        {src: "~/assets/css/main.css"},
    ],
    build: {},
    buildModules: ["@nuxt/typescript-build"],
    modules: [
        "@nuxtjs/axios",
    ],
    vuetify: {
        materialIcons: true,
        css: true,
        treeShake: true
    },
    axios: {}
}
