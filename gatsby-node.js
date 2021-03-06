const path = require('path');
const MonacoWebpackPlugin = require(`monaco-editor-webpack-plugin`);

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
      plugins: [
        new MonacoWebpackPlugin({
          languages: [
            "yaml",
            "json"
          ],
          features: [
            "coreCommands",
            "folding",
            "bracketMatching",
            "clipboard",
            "find",
            "colorDetector",
            "codelens"
          ]
        })
      ]
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      isBeta: Boolean
      isAlpha: Boolean
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions
  const docsTemplate = path.resolve(__dirname, 'src/templates/DocsTemplate.js/');
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___weight] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              linktitle
              title
              addOn
              isBeta
              isAlpha
            }
          }
        }
      }
    }
  `)

  createRedirect({
    isPermanant: true,
    redirectInBrowser: true,
    fromPath: "/docs/",
    toPath: "/docs/introduction/"
  });

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { path, linktitle, title } = node.frontmatter;
    const { html } = node;
    createPage({
      path,
      linktitle,
      title,
      html,
      component: docsTemplate
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Make the front page match everything client side.
  // Normally your paths should be a bit more judicious.
  if (page.path === `/`) {
    page.matchPath = `/*`
    createPage(page)
  }
  if (page.path === `/download`) {
    page.matchPath = `/download/*`
    createPage(page)
  }
  if (page.path === `/add-ons`) {
    page.matchPath = `/add-ons/*`
    createPage(page)
  }

}