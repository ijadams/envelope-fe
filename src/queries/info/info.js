import gql from "graphql-tag";

const INFO_QUERY = gql`
    query Homepage {
        info {
            top
            bottom
        }
    }
`;

export default INFO_QUERY;
