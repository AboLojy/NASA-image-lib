import {gql} from "apollo-server"
 const typeDefs = gql`
 type Image{
     href:String
     description:String
     title:String
 }
 type Query{
     images(q:String!,from:Int!):[Image]
 }
`;
export default typeDefs;