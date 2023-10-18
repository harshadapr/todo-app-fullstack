import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

export default function Todo(){

    const data = [
        {
            id: "ksabk",
            text: "buy milk",
            completed: false
        },
        {
            id: "ksqqabk",
            text: "buy milkbuy milkbuy milkbuy milk",
            completed: false
        },
        {
            id: "kwwsabk",
            text: "buy milkbuy milk",
            completed: false
        },
        {
            id: "keesabk",
            text: "buy milk2222",
            completed: false
        },
        {
            id: "ksrrabk",
            text: "buy vvbuy milkbuy milkbuy milk",
            completed: true
        }
    ];

    return (<div className="h-screen flex flex-col justify-between">
    <Navbar />
      <div className="bg-white p-8 flex-1 overflow-y-scroll">
        <h1 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Todo[s]</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                data.map((obj, idx) => {
                    return (<TaskCard id={obj.id} text={obj.text} completed={obj.completed} />);
                })
            }
        </div>
      </div>
      <Footer />
      </div>
    );
}