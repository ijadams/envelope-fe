import gql from "graphql-tag";

const NAV_QUERY = gql`
    query Nav {
        nav {
            navlogo {
                url
            }
            navlogomobile {
                url
            }
            signup_link
            signup_text
        }
        categories {
            id
            name
        }
    }
`;

export default NAV_QUERY;
