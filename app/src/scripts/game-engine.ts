import { Game } from "../types/game";

const gameFunction = function() {
    let game: Game = {
        AwayScore: 0,
        AwaySkaters: [
            { Name: 'Jammer One', Number: '123', Position: 'Jammer' },
            { Name: 'Jammer Two', Number: '456', Position: 'Jammer' },
            { Name: 'Blocker One', Number: '789', Position: 'Blocker' },
            { Name: 'Blocker Two', Number: '113', Position: 'Blocker' },
            { Name: 'Blocker Three', Number: '101', Position: 'Blocker' },
            { Name: 'Blocker Four', Number: '112', Position: 'Blocker' },
        ],
        AwayTeam: {
            Color: 'black', 
            Logo: '',
            Name: 'Black'
        },
        HomeScore: 0,
        HomeSkaters: [
            { Name: 'Jammer Three', Number: '987', Position: 'Jammer' },
            { Name: 'Jammer Four', Number: '654', Position: 'Jammer' },
            { Name: 'Blocker Five', Number: '321', Position: 'Blocker' },
            { Name: 'Blocker Six', Number: '001', Position: 'Blocker' },
            { Name: 'Blocker Seven', Number: '002', Position: 'Blocker' },
            { Name: 'Blocker Eight', Number: '003', Position: 'Blocker' },
        ],
        HomeTeam: {
            Color: 'white',
            Logo: '',
            Name: 'White'
        },
        JamTime: 120,
        OfficialReviewCount: 1,
        PeriodCount: 2,
        PeriodTime: 30*60,
        Periods: [],
        Status: 'NotStarted',
        TimeoutCount: 3
    }

    var intervalID: number = -1;
    var seconds: number = 0;

    onmessage = (e: MessageEvent) => {
        if (e.data === 'start') {
            start();
        } else if (e.data === 'stop') {
            stop();
        } else if (e.data === 'get_game') {
            postMessage(game);
        }
    };

    function start() {
        if (intervalID == -1) {
            intervalID = setInterval(tick, 1000);
        }
    }

    function stop() {
        clearInterval(intervalID);
        intervalID = -1;
    }

    function tick() {
        seconds++;
        postMessage(game);
    }
}

const gameFunctionString: string = gameFunction.toString();
const gameFunctionBody = gameFunctionString.substring(gameFunctionString.indexOf('{') + 1, gameFunctionString.lastIndexOf('}'));
const blob = new Blob([gameFunctionBody], { type: 'application/javascript' });
const gameScript = URL.createObjectURL(blob);

export default gameScript;