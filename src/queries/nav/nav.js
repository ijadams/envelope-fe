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
           
        }
    }
`;

export default NAV_QUERY;
