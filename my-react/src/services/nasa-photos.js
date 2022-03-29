import axios from "axios";
import config from "../config/config"
const nasa = {
    searchPhotos: async (query, page) => {
        const endpoint = config.nasaGqlUrl;
        const headers = {
            "content-type": "application/json"
        };
        const graphqlQuery = {
           // "operationName": "Images",
            "query": `{
                images(q:"${query}",from:${page}) {
                        href
                        title
                        description
              }
            }`,
            "variables": {}
        };

        const response = await axios({
            url: endpoint,
            method: 'post',
            headers: headers,
            data: graphqlQuery
        });
        return response.data.data.images;
    }
}
export default nasa;