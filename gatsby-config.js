module.exports = {
  siteMetadata: {
    title: `CaCoDev`,
    author: {
      name: "Casey Collins",
      image: "/img/me.jpg",
      biography: "Thoughts, stories, and ideas from Software Craftsman Casey Collins",
    },
    networks: [
      "https://twitter.com/cacodev",
      "https://github.com/cacodev",
      "https://www.linkedin.com/in/cacodev"
    ],
    about: '<p>... and I enjoy making quality software. \
    </p> \
    ',
  },
  plugins: [
    //`gatsby-plugin-tslint`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-emoji-unicode`,
          "gatsby-remark-gifs",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
    "gatsby-transformer-sharp",
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {
          primaryColor: "#0c9ed1",
        },
      },
    },
  ],
  pathPrefix: "/img",
}