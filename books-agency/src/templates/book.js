import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./templateStyles/bookStyles"

const BookTemplate = ({
  data: {
    wpcontent: {
      book: {
        book,
        genres: { edges: genres },
      },
    },
  },
}) => {

  return (
    <Layout>
      <SEO title="Book" />
      <Wrapper>
        <div className="book-container">
          <div className="book-image">
            <Image
              fluid={book.cover.imageFile.childImageSharp.fluid}
              alt={book.cover.altText}
            />
            <div className="genres">
              {genres.map(({ node: genre }) => (
                <div key={genre.name} className="genre">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="book-info">
            <h2>{book.title}</h2>
            <h3>
              <span>{book.author} -</span> <span>{book.year}</span>
            </h3>
            <p className="description">{book.description}</p>
            <p className="info">
              <strong>Uitgeverij:</strong> {book.publisher}
            </p>
            <p className="info">
              <strong>Taal:</strong> {book.language}
            </p>
            <p className="info">
              <strong>Type:</strong> {book.type}
            </p>
            <p className="info">
              <strong>Aantal pagina's:</strong> {book.pages}
            </p>
            <p className="info">
              <strong>Review:</strong> {book.review}
            </p>
            {book.age && (
              <p className="info">
                <strong>Geschikt voor:</strong> {book.age}
              </p>
            )}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default BookTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      book(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        book {
          year
          type
          title
          review
          publisher
          pages
          language
          ean
          description
          author
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
        }
        id
      }
    }
  }
`
