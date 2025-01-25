// Write a function that accepts an array of URLs,
// makes parallel queries for each of them, and returns an
// an array of results in the order in which the queries are completed.

// Example input data:
// const urls = ['https://jsonplaceholder.typicode.com/posts/1', 
// 'https://jsonplaceholder.typicode.com/posts/2'];

// Expected result:
// [
// { data: { ... }, status: 200 },
// { data: { ... }, status: 200 }
// ] 
import axios from 'axios';

type RequestsResult = {
    data: any;
    status: number;
};

async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
    const fetchPromises = urls.map(async (url) => {
        try {
            const response = await axios.get(url);
            return { data: response.data, status: response.status };
        } catch (error: any) {
            return {
                data: error.message || 'Unknown error',
                status: error.response?.status || 500,
            };
        }
    });

    return Promise.all(fetchPromises);
}

module.exports = { fetchAll };
