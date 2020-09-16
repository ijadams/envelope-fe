import gql from "graphql-tag";

const HOMEPAGE_QUERY = gql`
    query Homepage {
        homepage {
            herotext
        }
    }
`;

export default HOMEPAGE_QUERY;
