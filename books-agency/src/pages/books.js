import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Book,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const BooksPage = () => {
  const {
    wpcontent: {
      page: {
        booksMeta: { booksPageDescription, booksPageHeaderPicture },
      },
      books: { edges: books },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "books", idType: URI) {
          booksMeta {
            booksPageDescription
            booksPageHeaderPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
        books {
          edges {
            node {
              book {
                title
                author
                publisher
                description
                review
                pages
                language
                year
                ean
                age
                cover {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                type
              }
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Books" />
      <h2>Books</h2>
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={booksPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={booksPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are Books Agency</h2>
          <p>{booksPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="books">
          <h2>Our Books</h2>
          <div className="book-items">
            {books.map(({ node: { book, slug } }) => (
              <Book to={`/${slug}`} key={slug}>
                <Image
                  fluid={book.cover.imageFile.childImageSharp.fluid}
                  alt={book.cover.altText}
                />
                <div className="book-info">
                  <p>{book.title}</p>
                  <p>{book.author}</p>
                </div>
              </Book>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default BooksPage
