import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/index-layout"
import BlogList from "../components/blog-list/blog-list"

interface IProps {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: {
        node: {
          id: string
          frontmatter: {
            title: string
            date: string
            description: string
            cover: {
              childImageSharp: {
                gatsbyImageData: any
              }
            }
            fields: {
              slug: string
            }
            excerpt: string
          }
        }
      }[]
    }
  }
}

class Index extends React.Component<IProps> {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(
      (e: any) => e.node
    )
    const totalCount = this.props.data.allMarkdownRemark.totalCount

    return (
      <Layout>
        <BlogList posts={posts} totalCount={totalCount} />
      </Layout>
    )
  }
}

export default Index

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
            cover {
              childImageSharp {
                gatsbyImageData(layout:FULL_WIDTH)
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
