import "./App.css";
import { Tabs } from "antd";
import SearchComponent from "./components/SearchComponent";
import DocumentComponent from "./components/DocumentComponent";
import setBaseUrl from "./utils/setBaseUrl";

const { TabPane } = Tabs;
setBaseUrl();

function App() {
    function callback(key) {
        console.log(key);
    }
    return (
        <div className="container">
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Searching Movies" key="1">
                    <SearchComponent />
                </TabPane>
                <TabPane tab="Document" key="2">
                    <DocumentComponent />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default App;
