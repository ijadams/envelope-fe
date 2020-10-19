import gql from "graphql-tag";

const PROJECTS_QUERY = gql`
 query Projects {
    projects {
      id
      project_title
      project_description
      project_tags
      dark_text
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

export default PROJECTS_QUERY;
