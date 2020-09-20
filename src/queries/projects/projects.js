import gql from "graphql-tag";

const ARTICLES_QUERY = gql `
  query Articles {
    projects {
      id
      project_title
      project_description
      project_images {
        id
        url
        previewUrl
      }
      project_images_mobile {
        id
        url
        previewUrl
      }
    }
`;

export default ARTICLES_QUERY;