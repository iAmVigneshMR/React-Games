import { Fragment, useEffect, useState } from 'react'
import { getData } from './Data'

const MemoryGame = () => {
    const [catsAndDogs, setCatsAndDogs] = useState([]);
    const [prevImgIndexClicked, setprevImgIndexClicked] = useState([]);
    const [prevImgIdClicked, setprevImgIdClicked] = useState([]);
    const [openImage, setOpenImage] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [clickOnTimeOut, setClickOnTimeOut] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newHighestScoreOrNot, setNewHighestScoreOrNot] = useState(false);

    let pokeball = "/memoryGame/pokeball.jpeg";
    let prevHighestScore = localStorage.getItem("higheshScore");
    let parsedPrevHighestScore = JSON.parse(prevHighestScore);
    useEffect(() => {
        if (!showModal) shuffleArray("newGame");
    }, [showModal]);
    useEffect(() => {
        if (score === 10) {
            let finalScore = { "highestScore": score, "highestMoves": moves };
            if ((moves < parseFloat(parsedPrevHighestScore?.highestMoves)) || (parsedPrevHighestScore === null)) {
                localStorage.setItem("higheshScore", JSON.stringify(finalScore));
                setNewHighestScoreOrNot(true);
            };
            setShowModal(true);
        }
    }, [score]);

    const shuffleArray = (val) => {
        let array = getData.concat(getData);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setCatsAndDogs(array);
        if (val === "newGame" || val === "resetGame") {
            setprevImgIdClicked([]);
            setprevImgIndexClicked([]);
            setOpenImage([]);
            setMoves(0);
            setScore(0);
        };
        if (val === "resetGame") localStorage.removeItem("higheshScore");
    }

    const evaluate = () => {
        const [first, second] = prevImgIdClicked;
        const [firstIndex, secondIndex] = prevImgIndexClicked;
        let ifCondition = first === second && (first !== undefined) && second !== undefined;
        let ifIndexCondition = firstIndex !== secondIndex && (firstIndex !== undefined) && secondIndex !== undefined;
        let ifOpenImage = openImage.includes(second);
        if (typeof (first) === "number" && typeof (second) === "number" && first !== second) {
            setClickOnTimeOut(true);
            setTimeout(() => {
                setprevImgIndexClicked([]);
                setClickOnTimeOut(false);
            }, 700);
        }
        if (ifCondition && ifIndexCondition && !ifOpenImage) {
            setOpenImage((prev) => [...prev, first]);
            setScore((scor) => scor + 1);
        }
    }

    useEffect(() => {
        evaluate();
    }, [prevImgIdClicked]);

    const handleImgClick = (imgIndexClicked, catsId) => {
        if (prevImgIndexClicked.length === 1) {
            setprevImgIndexClicked((prev) => [...prev, imgIndexClicked]);
            setprevImgIdClicked((prev) => [...prev, catsId]);
            setMoves((moves) => moves + 1);
        } else {
            setprevImgIndexClicked([imgIndexClicked]);
            setprevImgIdClicked([catsId]);
        }
    }

    return (
        <Fragment>
            <h1 className='text-center'>Memory Game</h1>
            <div className="grid gap-2 grid-cols-2">
                <div className='pl-5'>
                    <p>Moves : {moves}</p>
                    <p>Score : {score}</p>
                </div>
                <div className='flex flex-col justify-end items-end'>
                    {parsedPrevHighestScore !== null && <p className='pr-2'>Highest score is {parsedPrevHighestScore?.highestScore} under {parsedPrevHighestScore?.highestMoves} moves</p>}
                    <div>
                        <button onClick={() => shuffleArray("newGame")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32">New Game</button>
                        <button onClick={() => shuffleArray("resetGame")} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 w-32">Reset Game</button>
                    </div>
                </div>
            </div>
            <div className="grid gap-2 lg:grid-cols-5">
                {catsAndDogs.map((catsAndDogsMap, i) =>
                    <div key={i} className="w-full h-32 relative rounded-lg shadow-md lg:max-w-sm overflow-hidden">
                        <div className="w-full h-32 flex flex-wrap items-center justify-center">
                            <img
                                className={`absolute object-fill ${prevImgIndexClicked.includes(i) ? "block" : "hidden"} ${openImage.includes(catsAndDogsMap.id) ? "opacity-60" : "opacity-100"}`}
                                src={catsAndDogsMap.img}
                                alt="image"
                            />
                            <img
                                className={`top-0 absolute object-fill ${prevImgIndexClicked.includes(i) ? "hidden" : "block"} ${openImage.includes(catsAndDogsMap.id) ? "opacity-60" : "opacity-100 cursor-pointer"}`}
                                src={!openImage.includes(catsAndDogsMap.id) ? pokeball : catsAndDogsMap.img}
                                alt="image"
                                onClick={() => !openImage.includes(catsAndDogsMap.id) && !clickOnTimeOut && handleImgClick(i, catsAndDogsMap.id)}
                            />
                        </div>
                    </div>
                )}
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {newHighestScoreOrNot ? "Your New High Score" : "Your Score"}
                                    </h3>
                                    <span
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer"
                                        onClick={() => setShowModal(false)}
                                    >
                                        ×
                                    </span>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        {newHighestScoreOrNot ? `Your New Highest score is ${score} under ${moves} moves` : `Your new score is ${score} under ${moves} moves`}
                                    </p>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </Fragment >
    )
}

export default MemoryGame