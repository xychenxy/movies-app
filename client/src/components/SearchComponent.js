import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table, Descriptions, message } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import PostMovieComponent from "./PostMovieComponent";
const { Search } = Input;

const SearchComponent = () => {
    const [displayMovies, setDisplayMovies] = useState();
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        const getDisplayNow = async () => {
            try {
                const res = await axios.get("api/moviesworld/all/movies");
                if (res.data.msg === "Success!") {
                    let allMovies = [];
                    res.data.data.forEach((movie) => {
                        let temp = {
                            key: movie[1].id,
                            id: movie[1].id,
                            title: movie[1].title,
                            source: movie[1].source,
                        };
                        allMovies.push(temp);
                    });
                    setDisplayMovies(allMovies);
                }
                console.log(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getDisplayNow();
    }, []);

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: "#1890ff",
            }}
        />
    );

    const columns = [
        {
            title: "Movie ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Movie Name",
            dataIndex: "title",
            key: "title",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Source",
            dataIndex: "source",
            key: "source",
        },
    ];

    const onSearch = (value) => {
        const searchMovie = async () => {
            try {
                const res = await axios.get(`api/moviesworld/movie/${value}`);
                if (res.data.msg === "Success!") {
                    setSearchResult(res.data.data);
                }
                console.log(res.data);
            } catch (err) {
                message.error("Please copy Movie ID to search movie details");
                console.log(err);
            }
        };
        searchMovie();
    };

    return (
        <div className="container">
            <div className="searchSection">
                <Search
                    placeholder="searching movies"
                    enterButton="Search"
                    allowClear
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                    style={{ marginBottom: 40 }}
                />
                {searchResult && (
                    <Descriptions title="Movie Info">
                        <Descriptions.Item label="Movie ID">
                            {searchResult.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Imdb ID">
                            {searchResult.imdb_id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Title">
                            {searchResult.original_title}
                        </Descriptions.Item>
                        <Descriptions.Item label="Release Date">
                            {searchResult.release_date}
                        </Descriptions.Item>
                        <Descriptions.Item label="Vote Average">
                            {searchResult.vote_average}
                        </Descriptions.Item>
                        <Descriptions.Item label="Overview">
                            {searchResult.overview}
                        </Descriptions.Item>
                    </Descriptions>
                )}
                <div>
                    <PostMovieComponent />
                </div>
                {displayMovies && (
                    <Table columns={columns} dataSource={displayMovies} />
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
