
import { useState, useEffect, useRef } from "react";

export class GameStateSave {
    scores = useRef(0);

    SetScoreTable (scoreTable)
    {
        scores.current = this.scores.current + 1;
    }

    GetScoreTable()
    {
        return scores.current;
    }
}
