import {useEffect, useState} from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://graphql.contentful.com/content/v1/spaces/[space-id]?access_token=[access-token]',
    cache: new InMemoryCache()
});

function App() {
    const [page, setPage] = useState(null);

    useEffect(() => {

        client.query({query: gql`
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
        })
        .then(({data }) => {
                     console.log(data)
                    // rerender the entire component with new data
                    setPage(data.toutCollection.items[0]);
                })
        .catch((err) =>  console.error(err));
    }, []);

    if (!page) {
        return "Loading...";
    }

    // render the fetched Contentful data
    return (
        <div className="App">
            <header className="App-header">
                <img src={page.media.url} className="App-logo" alt="logo"/>
                <p>{page.heading}</p>
            </header>
        </div>
    );
}

export default App;