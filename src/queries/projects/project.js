import gql from "graphql-tag";

const PROJECT_QUERY = gql`
  query Projects($id: ID!) {
    project(id: $id) {
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
  }
`;

export default PROJECT_QUERY;