import { defineStore } from 'pinia';
import type { Game } from '@/types/game';
import { GameStatus } from '@/types/game';
import { Position } from '@/types/skater';

const CHANNEL_NAME = 'game'

export const useGameStore = defineStore('game', {
  state: (): Game => ({
    AwayScore: 0,
    AwaySkaters: [
      { Name: 'Jammer One', Number: '123', Position: Position.Jammer },
      { Name: 'Jammer Two', Number: '456', Position: Position.Jammer },
      { Name: 'Blocker One', Number: '789', Position: Position.Blocker },
      { Name: 'Blocker Two', Number: '113', Position: Position.Blocker },
      { Name: 'Blocker Three', Number: '101', Position: Position.Blocker },
      { Name: 'Blocker Four', Number: '112', Position: Position.Blocker },
    ],
    AwayTeam: {
      Color: 'black',
      Logo: '',
      Name: 'Black'
    },
    HomeScore: 0,
    HomeSkaters: [
      { Name: 'Jammer Three', Number: '987', Position: Position.Jammer },
      { Name: 'Jammer Four', Number: '654', Position: Position.Jammer },
      { Name: 'Blocker Five', Number: '321', Position: Position.Blocker },
      { Name: 'Blocker Six', Number: '001', Position: Position.Blocker },
      { Name: 'Blocker Seven', Number: '002', Position: Position.Blocker },
      { Name: 'Blocker Eight', Number: '003', Position: Position.Blocker },
    ],
    HomeTeam: {
      Color: 'white',
      Logo: '',
      Name: 'White'
    },
    JamTime: 120,
    OfficialReviewCount: 1,
    PeriodCount: 2,
    PeriodTime: 30 * 60,
    Periods: [],
    Status: GameStatus.NotStarted,
    TimeoutCount: 3
  }),

  getters: {
    isGameStarted: (state) => state.Status !== GameStatus.NotStarted,
    isGameInProgress: (state) => state.Status === GameStatus.InProgress,
    totalScore: (state) => state.HomeScore + state.AwayScore,
  },

  actions: {
    // Score management
    incrementHomeScore(points: number) {
      this.HomeScore += points
      this.broadcastState()
    },

    incrementAwayScore(points: number) {
      this.AwayScore += points
      this.broadcastState()
    },

    resetScores() {
      this.HomeScore = 0
      this.AwayScore = 0
      this.broadcastState()
    },

    // Game status management
    startGame() {
      this.Status = GameStatus.InProgress
      this.broadcastState()
    },

    pauseGame() {
      this.Status = GameStatus.Intermission
      this.broadcastState()
    },

    endGame() {
      this.Status = GameStatus.UnofficialFinal
      this.broadcastState()
    },

    finalizeGame() {
      this.Status = GameStatus.Final
      this.broadcastState()
    },

    updateHomeTeam(name: string, color: string, logo: string | null) {
      this.HomeTeam = { Name: name, Color: color, Logo: logo }
      this.broadcastState()
    },

    updateAwayTeam(name: string, color: string, logo: string | null) {
      this.AwayTeam = { Name: name, Color: color, Logo: logo }
      this.broadcastState()
    },

    syncState(gameState: Game) {
      this.$patch(gameState)
    },

    // Broadcast state to other windows/tabs
    broadcastState() {
      const channel = new BroadcastChannel(CHANNEL_NAME)
      // Use JSON serialization to create a clean copy
      const plainState = JSON.parse(JSON.stringify(this.$state))
      channel.postMessage(plainState)
      channel.close()
    },

    // Initialize BroadcastChannel listener
    initBroadcastListener() {
      const channel = new BroadcastChannel(CHANNEL_NAME)
      channel.onmessage = (event) => {
        this.syncState(event.data)
      }
      return channel
    }
  }
})
