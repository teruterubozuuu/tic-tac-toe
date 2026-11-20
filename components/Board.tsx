"use client";
import { PxlKitIcon } from "@pxlkit/core";
import { ArrowRight, Undo } from "@pxlkit/ui";
import { PixelBadge, PixelButton, PixelCard, PixelFloat, PixelGrid, PixelSlideIn } from "@pxlkit/ui-kit";
import { useEffect, useState } from "react";

type SquareProps = {
    value: string;
    onSquareClick: () => void;
    playerTone: string;
}

function Square({ value, onSquareClick }: SquareProps) {
    const textColor =
        value === "X"
            ? "text-retro-red!"
            : value === "O"
                ? "text-retro-cyan!"
                : ""
    return (
        <PixelButton tone="neutral" className={`cursor-pointer h-15 w-15 font-pixel ${textColor}`} onClick={onSquareClick}>{value}</PixelButton>
    )
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [nextRound, setNextRound] = useState(false);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);

    function calculateWinner(squares: string[]) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        if (squares.every((square) => square !== null)) {
            return "Draw";
        }
        return null;
    }

    /**
     * Dictates the Winner or if the
     * round is currently ongoing
     */
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = " Player " + (xIsNext ? "X" : "O") + "'s turn";
    }

    /**
     * Calculates player score upon winning
     * and updates nextRound to "true"
     */
    useEffect(() => {
        if (winner === "X") {
            setXScore((prev) => prev + 1);
        } else if (winner === "O") {
            setOScore((prev) => prev + 1);
        }

        if (winner) {
            setNextRound(true);
        }
    }, [winner])


    /**
     * Moves to the next round if a winner has been determined.
     */
    const handleNextRound = () => {
        setSquares(Array(9).fill(null));
        status = " Player " + (xIsNext ? "X" : "O") + "'s turn";
        setNextRound(false);
    }


    /**
     * Assigns a value to a square every time a player clicks it.
     * Each square can be assigned with a value of "X" or "O"
     * depending on the current player's turn.
     * @param value 
     * @returns 
     */
    const handleClick = (value: number) => {
        const nextSquares = squares.slice();
        if (squares[value] || calculateWinner(squares)) {
            return;
        }
        if (squares[value]) {
            return;
        }

        if (xIsNext) {
            nextSquares[value] = "X";
        } else {
            nextSquares[value] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    /**
     * Resets the squares and scores
     */
    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setXScore(0);
        setOScore(0);
    }

    /**
     * Changes the text color of the status in line with
     * the color of each respective player (Red for X, and Cyan for O)
     */
    const playerTone =
        status.includes("X") ? "text-retro-red" : "text-retro-cyan"

    return (
        <PixelSlideIn duration={1000}>
            <div className="flex justify-center items-center h-svh">
                <div className="flex flex-col gap-5 items-center">
                    <PixelFloat>
                        <h1 className="font-pixel text-2xl">
                            <span className="text-retro-cyan">Tic</span>
                            -
                            <span className="text-retro-green">Tac</span>
                            -
                            <span className="text-retro-red">Toe</span>
                        </h1>
                    </PixelFloat>
                    <p className="font-mono text-xs">A fun game to play with a friend</p>
                    <span className={`font-pixel text-xs ${playerTone}`}>{status}</span>
                    <PixelCard>
                        <PixelGrid cols={3} gap={3}>
                            <Square value={squares[0]} onSquareClick={() => handleClick(0)} playerTone={playerTone} />
                            <Square value={squares[1]} onSquareClick={() => handleClick(1)} playerTone={playerTone} />
                            <Square value={squares[2]} onSquareClick={() => handleClick(2)} playerTone={playerTone} />

                            <Square value={squares[3]} onSquareClick={() => handleClick(3)} playerTone={playerTone} />
                            <Square value={squares[4]} onSquareClick={() => handleClick(4)} playerTone={playerTone} />
                            <Square value={squares[5]} onSquareClick={() => handleClick(5)} playerTone={playerTone} />

                            <Square value={squares[6]} onSquareClick={() => handleClick(6)} playerTone={playerTone} />
                            <Square value={squares[7]} onSquareClick={() => handleClick(7)} playerTone={playerTone} />
                            <Square value={squares[8]} onSquareClick={() => handleClick(8)} playerTone={playerTone} />
                        </PixelGrid>
                    </PixelCard>

                    <div className="flex gap-3">
                        <div className="flex flex-col items-center gap-2">
                            <PixelBadge tone="red">Player X</PixelBadge>
                            <span className="text-3xl text-retro-red font-pixel">{xScore}</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <PixelBadge tone="cyan">Player O</PixelBadge>
                            <span className="text-3xl text-retro-cyan font-pixel">{oScore}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-center items-center">
                        <PixelButton iconLeft={<PxlKitIcon icon={Undo} size={18} />} tone="gold" className="cursor-pointer" onClick={handleReset}>Restart</PixelButton>
                        <PixelButton tone="purple" iconRight={<PxlKitIcon icon={ArrowRight} size={18} />} onClick={handleNextRound} disabled={!nextRound} className="cursor-pointer">Next Round</PixelButton>
                    </div>

                    <p className="font-mono text-retro-text/60 text-xs flex flex-wrap py-2 px-5 text-center">Built with React 19, Next.js 16, Tailwind CSS, and pxlkit</p>
                </div>
            </div>
        </PixelSlideIn>
    )
}
