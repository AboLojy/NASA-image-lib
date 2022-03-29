import axios from "axios";

const resolvers = {
    Query: {
        images: async (parent, args, context, info) => {

            const imgs = await axios.get(`https://images-api.nasa.gov/search?q=${args.q}&page=${args.from}`);

            var data;
            await (async () => {
                try {
                    data = imgs.data.collection.items.map(item => ({
                        description: item.data[0].description,
                        href: item.links ? item.links[0].href : "",
                        title: item.data[0].title
                    }));
                } catch (error) {
                    console.log(error);
                    return [{ title: "Server error", description: error.message, href: "server error url" }]
                }
            })();


            return data;
        },
    },
};
export default resolvers;