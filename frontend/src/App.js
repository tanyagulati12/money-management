import React from "react";
import { motion } from "framer-motion";
import HomepageNavbar from "./components/HomepageNavbar";
import { BrowserRouter, Routes, Route, json, Link } from "react-router-dom";
import { FaArrowRight, FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import Register from "./components/Register";

function App() {

    const [state, setState] = React.useState(0);
    const [error, setError] = React.useState({ is: false, message: "" });
    const [data, setData] = React.useState([]);
    const [userData, setUserData] = React.useState({
        title: "", monthlyIncome: "", percentageOfInvestment: "",
    });
    const [username, setUsername] = React.useState("");

    React.useEffect(() => {
        if(localStorage.getItem("username") != null) {
            setUsername(localStorage.getItem("username"));
        }
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:8080/dashboard/${username}`);
            const jsondata = await data.json();
            if(data.ok) {
                setData(jsondata);
            }
        }
        try {
            if(username !== "") fetchData();
        }
        catch(e) {
            console.log("Can't connect with backend, consider checking if server is running...")
        }
    }, [username]);

    React.useEffect(() => {
        if (state < 100) {
            setTimeout(() => {
                setState(init => init + 1);
            }, 20)
        }
    }, [state])


    return (<BrowserRouter>
        <Routes>
            <Route path={"/"} element={
                <React.Fragment>
                    <HomepageNavbar />
                    <main
                        style={{
                            background: `radial-gradient(circle farthest-side at 50% 0%, #2E073F 0% , black ${state}%)`
                        }}
                        className={`App pt-[5rem] h-screen w-[90%] mx-auto text-white flex justify-center items-center`}>

                        <section className={`flex-1 h-full p-8`}>
                            <motion.h1
                                animate={{
                                    scale: 1
                                }}
                                initial={{
                                    scale: 0
                                }}
                                transition={{
                                    delay: 0.75
                                }}
                                className={`bg-black/20 my-10 inline-block p-2 rounded-xl border-[0.25px] border-gray-600`}>#1
                                Money
                                Management Platform
                            </motion.h1>

                            <motion.h1
                                animate={{
                                    x: 0
                                }}
                                initial={{
                                    x: -500
                                }}
                                transition={{
                                    duration: 0.75, ease: [0.85, 0, 0.15, 1], delay: 0.5
                                }}
                                className={`text-[3rem]`}>
                                Your Complete
                            </motion.h1>
                            <motion.h1
                                animate={{
                                    x: 0
                                }}
                                initial={{
                                    x: -700
                                }}
                                transition={{
                                    duration: 0.75, ease: [0.85, 0, 0.15, 1], delay: 0.75
                                }}
                                className={`text-[3rem]`}>Finance Management
                            </motion.h1>
                            <motion.h1
                                animate={{
                                    x: 0
                                }}
                                initial={{
                                    x: -500
                                }}
                                transition={{
                                    duration: 0.75, ease: [0.85, 0, 0.15, 1], delay: 1
                                }}
                                className={`text-[3rem]`}>Platform
                            </motion.h1>

                            <motion.p
                                animate={{
                                    opacity: 1
                                }}
                                initial={{
                                    opacity: 0
                                }}
                                transition={{
                                    delay: 1, duration: 0.5
                                }}
                                className={`text-[1rem] my-10 text-gray-600 text-justify`}>
                                Empower your financial future with our comprehensive management tools. From
                                budgeting and
                                expense tracking to investment insights and savings goals. Take control and achieve
                                your
                                financial dreams with
                                ease
                            </motion.p>

                            <div className={`flex justify-start items-center gap-[2.5rem]`}>
                                <motion.div
                                    animate={{
                                        scale: 1
                                    }}
                                    initial={{
                                        scale: 0
                                    }}
                                    transition={{
                                        delay: 1.2, duration: 0.5, ease: [0.85, 0, 0.15, 1]
                                    }}
                                    className={`flex flex-col p-3 rounded-xl bg-black/20 border-[0.25px] border-gray-600`}>
                                    <h1 className={`text-[2rem] text-center`}>50K</h1>
                                    <h1 className={`text-center font-light text-[0.75rem]`}>Downloads</h1>
                                </motion.div>

                                <motion.div
                                    animate={{
                                        scale: 1
                                    }}
                                    initial={{
                                        scale: 0
                                    }}
                                    transition={{
                                        delay: 1.3, duration: 0.5, ease: [0.85, 0, 0.15, 1]
                                    }}
                                    className={`flex flex-col p-3 rounded-xl bg-black/20 border-[0.25px] border-gray-600`}>
                                    <h1 className={`text-[2rem] text-center`}>30K</h1>
                                    <h1 className={`text-center font-light text-[0.75rem]`}>Users</h1>
                                </motion.div>

                                <motion.div
                                    animate={{
                                        scale: 1
                                    }}
                                    initial={{
                                        scale: 0
                                    }}
                                    transition={{
                                        delay: 1.4, duration: 0.5, ease: [0.85, 0, 0.15, 1]
                                    }}
                                    className={`flex flex-col p-3 rounded-xl bg-black/20 border-[0.25px] border-gray-600`}>
                                    <h1 className={`text-[2rem] text-center`}>15K</h1>
                                    <h1 className={`text-center font-light text-[0.75rem]`}>Feedback</h1>
                                </motion.div>
                            </div>
                        </section>

                        <section className={`flex-1 pt-[5rem] flex justify-end items-start p-8`}>
                            <motion.div
                                animate={{
                                    y: 0
                                }}
                                initial={{
                                    y: "80vh"
                                }}
                                transition={{
                                    duration: 0.5, ease: [0.85, 0, 0.15, 1], delay: 1.5
                                }}
                                className={`w-[90%] h-[90%] p-8 items-center justify-center flex flex-col bg-white/10 border-[0.25px] border-gray-600 rounded-xl`}>
                                {username === ""? 
                                <Link to="/register" className="w-fit text-xl p-11 text-center rounded-xl text-black bg-white">Login to continue</Link> : (
                                    <div className="">
                                <h1 className={` w-full text-3xl p-11 text-center flex-1 flex justify-center items-center rounded-xl text-white`}>Add to Dashboard</h1>
                                <p className="text-center text-red-600">{!error.is ? "" : error.message}</p>
                                <form

                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const fetchData = async () => {
                                            const data = await fetch(`http://localhost:8080/create/${username}/${userData.title}/${userData.monthlyIncome}/${userData.percentageOfInvestment}`, {
                                                method: "POST",
                                            });
                                            console.log(data);
                                            const jsonData = await data.json();
                                            console.log(jsonData);
                                            if(!data.ok) {
                                                setError({is:true, message: jsonData.message});
                                            }else{
                                                window.location.assign("/dashboard");
                                            }
                                            
                                        }
                                        fetchData();
                                    }}
                                    className={`w-full`}>
                                    <h1 className={`my-3`}>Username: </h1>

                                    <input
                                        onChange={(e) => {
                                            setUserData({
                                                title: e.target.value,
                                                monthlyIncome: userData.monthlyIncome,
                                                percentageOfInvestment: userData.percentageOfInvestment
                                            })
                                        }}
                                        placeholder={`Enter here.`}
                                        className={`w-full text-[1.1rem] rounded-l outline-none p-2 bg-white/10 border-[0.25px] border-white`} />
                                    <h1 className={`my-3`}>Your monthly income: </h1>
                                    <input
                                        onChange={(e) => {
                                            setUserData({
                                                title: userData.title,
                                                monthlyIncome: e.target.value,
                                                percentageOfInvestment: userData.percentageOfInvestment
                                            })
                                        }}
                                        placeholder={`Enter here.`}
                                        className={`w-full text-[1.1rem] rounded-l outline-none p-2 bg-white/10 border-[0.25px] border-white`} />

                                    <h1 className={`my-3`}>Percentage of investment per month: </h1>

                                    <input
                                        onChange={(e) => {
                                            setUserData({
                                                title: userData.title,
                                                monthlyIncome: userData.monthlyIncome,
                                                percentageOfInvestment: e.target.value
                                            })
                                        }}
                                        placeholder={`Enter here.`}
                                        className={`w-full text-[1.1rem] rounded-l outline-none p-2 bg-white/10 border-[0.25px] border-white`} />

                                    <button
                                        type={"submit"}
                                        className={`bg-white w-full rounded-l text-black p-2 mt-5`}>Submit
                                    </button>
                                </form>
                                </div>
    )}
                            </motion.div>
                        </section>
                    </main>

                </React.Fragment>
            } />

            <Route path={"/dashboard"} element={
                <React.Fragment>
                    <main
                        style={{
                            background: `radial-gradient(circle farthest-side at 50% 0%, #2E073F 0% , black 100%)`
                        }}
                        className={`min-h-screen w-screen py-10 mx-auto bg-blue-300/10 flex flex-col`}>
                        <motion.header
                            animate={{
                                y: 0
                            }}
                            initial={{
                                y: -300
                            }}
                            transition={{
                                duration: 0.75,
                                ease: [0.85, 0, 0.15, 1],
                            }}
                            className={`text-white mb-10 font-bold text-center text-[3rem] uppercase`}>
                            Dashboard
                        </motion.header>
                        {
                        data.map((item, index) =>  {
                            let historySum = 0;
                            item.data.forEach((entry) => historySum += entry.amount);
                            item.historySum = historySum;
                        return(<UserSection item={item} key={index} index={index} username={username}/>)
            })
                        }
                    </main>
                </React.Fragment>
            } />

            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<LogOut />} />
        </Routes>
    </BrowserRouter>);
}


// const Home = () => {

// }


const UserSection = ({ item, index, username }) => {
    const [history, setHistory] = React.useState(item.data);
    const [task, setTask] = React.useState({ taskName: "", taskAmount: "" });
    return (
        <section
            key={index}
            className={`p-4 w-[85%] mx-auto my-10 rounded-t-2xl h-full flex-1 flex flex-col`}>
            <div className={`flex justify-between items-start`}>
                <motion.h1
                    animate={{
                        x: 0
                    }}
                    initial={{
                        x: -400
                    }}
                    transition={{
                        duration: 0.75,
                        ease: [0.85, 0, 0.15, 1],
                        delay: 0.1
                    }}
                    className={`text-white font-light text-[1.5rem] flex justify-between items-center w-full`}>
                    <div>

                        Name:
                        <br />
                        <span className={`font-bold uppercase`}>{item.monthName}</span>
                    </div>

                    <div>
                        <motion.form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const sendTaskData = async () => {
                                    const data = await fetch(`http://localhost:8080/addTask/${username}/${item.monthName}/${task.taskName}/${task.taskAmount}`, {
                                        method: "POST",
                                    })
                                    const jsonData = await data.json();
                                    console.log(jsonData.history[index].data);
                                    setHistory(jsonData.history[index].data);
                                }
                                sendTaskData();
                            }}
                            animate={{
                                x: 0
                            }}
                            initial={{
                                x: 400
                            }}
                            transition={{
                                duration: 0.75,
                                delay: 0.5,
                                ease: [0.85, 0, 0.15, 1],
                            }}
                            className={`flex justify-center items-center gap-[1rem]`}>

                            <div className="flex gap-11">
                                <input
                                    onChange={(e) => setTask({ taskName: e.target.value, taskAmount: task.taskAmount })}
                                    className={`bg-white/5 mb-2 outline-none border-[0.25px] border-white rounded-2xl p-2 text-[1rem]`}
                                    placeholder={"Enter Task Name"} />
                                <input
                                    onChange={(e) => setTask({ taskName: task.taskName, taskAmount: e.target.value })}
                                    className={`bg-white/5 outline-none border-[0.25px] border-white rounded-2xl p-2 text-[1rem]`}
                                    placeholder={"Enter Amount"} />
                            </div>
                            <button
                                type={"submit"}
                                className={`bg-white text-black p-2 rounded-2xl`}>
                                <FaArrowRight />
                            </button>
                        </motion.form>
                    </div>
                </motion.h1>
            </div>

            <div className={`w-full  h-full flex-1 mt-10 flex gap-[1rem]`}>
                <div className={`flex-1 h-full p-4 text-white`}>
                    <div className={`w-full mb-5 px-2 flex justify-between items-center`}>
                        <h1>Spending Type</h1>
                        <h1>Amount</h1>
                    </div>
                    {!history.length &&
                        <div className={`w-full text-center font-light text-gray-600 my-10`}>No
                            Data here 🥲
                        </div>
                    }
                    {history.map((item_t, index) => {
                        return <div
                            className={`border-[0.25px] mb-4 rounded-xl bg-black/10 text-[1.24rem] flex justify-between items-center border-white p-4`} key={index}>
                            {item_t.name}
                    
                            <span className={`flex gap-[1rem] items-center`}>
                                {item_t.amount}
                                {/* <div
                                    onClick={() => {
                                        console.log(item.name, item_t.name);
                                        const deleteTask = async () => {
                                            const data = await fetch(`http://localhost:8080/removeTask/${item.name}/${item_t.name}`, {
                                                method: "POST"
                                            })
                                            const jsonData = await data.json();
                                            window.location.reload();
                                        }
                                        deleteTask();
                                    }}
                                    className={`p-1 rounded-full hover:bg-white hover:text-black hover:cursor-pointer`}>
                                    <MdOutlineDelete />
                                </div> */}
                            </span>
                        </div>
                    })}
                </div>

                <div className={`flex-1 h-full`}>
                    <div className={`flex gap-[1rem]`}>
                        <motion.div
                            animate={{
                                scale: 1
                            }}
                            initial={{
                                scale: 0
                            }}
                            transition={{
                                duration: 0.75,
                                ease: [0.85, 0, 0.15, 1],
                                delay: 0.1
                            }}
                            className={`p-4 flex-1 text-[3rem] border-[0.25px] text-center bg-black/10 border-white rounded-xl inline-block font-bold text-white`}>
                            {item.monthlyIncome}
                            <div className={`font-light uppercase text-[0.8rem]`}>
                                Monthly Income
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{
                                scale: 1
                            }}
                            initial={{
                                scale: 0
                            }}
                            transition={{
                                duration: 0.75,
                                ease: [0.85, 0, 0.15, 1],
                                delay: 0.2
                            }}
                            className={`p-4 text-[3rem] flex-1 border-[0.25px] text-center bg-black/10 border-white rounded-xl inline-block font-bold text-white`}>
                            {item.monthlyIncome * ((100-item.percentageOfInvestment) / 100)}
                            <div className={`font-light uppercase text-[0.8rem]`}>
                                Income After Cutoff
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        animate={{
                            scale: 1
                        }}
                        initial={{
                            scale: 0
                        }}
                        transition={{
                            duration: 0.75,
                            ease: [0.85, 0, 0.15, 1],
                            delay: 0.3
                        }}
                        className={`p-4 w-full mt-[1rem] flex-1 text-[3rem] border-[0.25px] text-center bg-black/10 border-white rounded-xl inline-block font-bold text-white`}>
                        {item.percentageOfInvestment}%

                        <div className={`font-light uppercase text-[0.8rem]`}>
                            Percentage of Investment
                        </div>
                    </motion.div>


                    <motion.div
                        animate={{
                            scale: 1
                        }}
                        initial={{
                            scale: 0
                        }}
                        transition={{
                            duration: 0.75,
                            ease: [0.85, 0, 0.15, 1],
                            delay: 0.4
                        }}
                        className={`p-4 w-full mt-[1rem] flex-1 text-[3rem] border-[0.25px] text-center bg-black/10 border-white rounded-xl inline-block font-bold text-white`}>
                        {(item.monthlyIncome * ((100-item.percentageOfInvestment) / 100)) - item.historySum}
                        <div className={`font-light uppercase text-[0.8rem]`}>
                            Total Wealth Left
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

const LogOut = () => {
    React.useEffect(() => {
        localStorage.removeItem("username");
        window.location.assign("/");
    });
}

export default App;
