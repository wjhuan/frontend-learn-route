module.exports = {
  title: "前端食堂",
  description: "A lightweight creator for VuePress project.",
  base: "/",
  head: [
    ["link",{ rel: "icon",href: "/assets/logo.png" }]
  ],
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    lastUpdated: "Last Updated",
    repo: "https://github.com/wjhuan/frontend-learn-route",
    editLinks: false,
    algolia:true,
  },
};