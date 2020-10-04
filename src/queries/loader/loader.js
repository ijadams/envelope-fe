import gql from "graphql-tag";

const LOADER_QUERY = gql`
    query Loader {
        loader {
            desktop {
              url
              id
            }
            mobile {
              url
              id
            }
        }
    }
`;

export default LOADER_QUERY;
