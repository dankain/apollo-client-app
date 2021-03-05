import "./App.css";
import {gql, useQuery} from '@apollo/client';


const TOUT_COLLECTIONS = gql`
    {
        toutCollection {
            items {
                heading
                body
                media {
                    url
                }
                link {
                    slug
                }
            }
        }
    }
`

function App() {

    const {loading, error, data} = useQuery(TOUT_COLLECTIONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)

    // render the fetched Contentful data
    return (
        <div className="App">
            <header className="App-header">
                <img src={data.toutCollection.items[0].media.url} className="App-logo" alt="logo"/>
                <p>{data.toutCollection.items[0].heading}</p>
            </header>
        </div>
    );
}

export default App;