import React from "react";
import { Card } from "antd";

const DocumentComponent = () => {
    return (
        <div className="cardWrap">
            <Card
                title="Project Introduction"
                bordered={false}
                className="cardContainer"
            >
                <p>
                    Deploying in AWS EC2. Backend is NodeJS. Frontend is React
                </p>
                <p>
                    This movie app is using two movies' APIs to retrive data,{" "}
                    <a href="https://www.themoviedb.org/documentation/api">
                        Themoviedb
                    </a>{" "}
                    and <a href="https://developer.movieglu.com/">Movieglu</a>.
                </p>
            </Card>
            <Card title="Completed" bordered={false} className="cardContainer">
                <p>
                    <ul>
                        <li>
                            <span className="specialBold">
                                can search movie details with movie id.{" "}
                            </span>
                            In order to improve quering performance, I use{" "}
                            <span className="specialBoldItalic">
                                memory-cache
                            </span>{" "}
                            to cache requests in the last 20 minutes, which can
                            relieve server pressure, response quickly, and save
                            the number of requests
                        </li>
                        <li>
                            <span className="specialBold">
                                can show on 'displaying now' movies.{" "}
                            </span>
                            These APIs don't return movies with prices. I assume
                            response with any price, although I have spent the
                            whole day to do search. I assume the response with{" "}
                            <span className="specialBoldItalic">prices</span>,
                            and then comparing their prices in order to get the
                            cheapest one before returing response.
                        </li>
                        <li>
                            <span className="specialBold">
                                can post a movie.{" "}
                            </span>
                        </li>
                        <li>
                            <span className="specialBold">
                                method getAllDisplayNow{" "}
                            </span>
                            Can global search this method to see details. I use
                            trycatch method and Array to get available APIs, and
                            then pass Array into axios.all(). This can fix if
                            not all APIs could works.
                        </li>
                        <li>
                            <span className="specialBold">
                                Production and Development env{" "}
                            </span>
                            I have configed two environment. Production should
                            connect to Master, Development should connect to
                            Test branch.
                        </li>
                        <li>
                            <span className="specialBold">API config </span>
                            Although the code be putted on privacy repo, do not
                            upload any key on it. All the API keys are in Config
                            file (the same level with server.js). Differnt
                            Environment can get their keys respectively.
                        </li>
                    </ul>
                </p>
            </Card>
            <Card
                title="Would like to implement"
                bordered={false}
                className="cardContainer"
            >
                <p>
                    I haven't completed unit testing as I spent most of time on
                    doing research on movies' APIs. I would like to implement it
                    if needed.
                </p>
                <p>
                    I haven't deployed it with AWS Serverless, although I have
                    deployed simple website following the tutorial. It is part
                    of AWS Developer Associate Certificate which I am going to
                    take part in this exam in 3 months.
                </p>
            </Card>
        </div>
    );
};
export default DocumentComponent;
