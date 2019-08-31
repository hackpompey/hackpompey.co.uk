import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"

/**
 * Used by gatsby-node to generate pages from any md files in src/pages/
 * Does not apply to src/pages/events/
 */
const MarkdownPage = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.markdownRemark.frontmatter.title} />

      {/* Display Markdown content */}
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
export default MarkdownPage
