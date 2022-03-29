import { useState } from "react";
import ImageGrid from "../components/ImageGrid";
import nasa from "../services/nasa-photos";
import { Input, Button, Container ,Loader,Message,Dimmer} from 'semantic-ui-react'

const Home = props => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');
    const [sErr, setSerr] = useState('');
    const [loading, setLoading] = useState(false);

    const search = async () => {
        const txtQuery = document.getElementById("query").value;
        const txtPage = document.getElementById("page").value;

        if (!txtPage) {
            setErr("Should enter page number");
            setSerr("Validation");
            return;
        }
        if (isNaN(txtPage)) {
            setErr("Page should be number");
            setSerr("Validation");
            return;
        }
        if (!txtQuery) {
            setErr("You should enter the image name");
            setSerr("Validation");
            return;
        }
        try {
            setLoading(true);
            var images = await nasa.searchPhotos(txtQuery, txtPage);
            setLoading(false);
            setData(images);
        } catch (error) {
            setErr(error.Message);
            setSerr("Server");
        }

    };
    return (

        <div className="home">


            <Container>
                <div style={{margin:"5%"}}>
                    <h2>Search Photos</h2>
                </div>
                <div>
                    <Input id={"query"} placeholder='Search...' />
                    &nbsp;
                    <Input id={"page"} placeholder='Page number...' />
                    &nbsp;
                    <Button secondary onClick={search}>Search</Button>
                </div>
                
                    {loading && <Dimmer active inverted >
                        <Loader inverted>Loading</Loader>
                    </Dimmer>}
                    {!!data.length && <ImageGrid entireData={data} pageSize={6} photoPerCol={3} />}

               
                {err && <Message negative>
                    <Message.Header>{err}</Message.Header>
                    <p>{sErr}</p>
                </Message>}
            </Container >
        </div>

    )
}
export default Home;