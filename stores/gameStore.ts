import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    players: [] as string[],
    questions: [] as { type: string, question: string }[],
    selectedPlayer: '',
    generatedQuestions: [] as { type: string, question: string }[], // Añadido para mostrar preguntas generadas
  }),
  actions: {
    addPlayer(player: string) {
      this.players.push(player);
      this.saveToLocalStorage();
    },
    removePlayer(player: string) {
      this.players = this.players.filter(p => p !== player);
      this.saveToLocalStorage();
    },
    addQuestion(type: string, question: string) {
      this.questions.push({ type, question });
      this.saveToLocalStorage();
    },
    removeQuestion(question: string) {
      this.questions = this.questions.filter(q => q.question !== question);
      this.saveToLocalStorage();
    },
    selectRandomPlayer() {
      if (this.players.length) {
        const randomIndex = Math.floor(Math.random() * this.players.length);
        this.selectedPlayer = this.players[randomIndex];
        this.saveToLocalStorage();
      }
    },
    getRandomQuestion(type?: string) {
      let filteredQuestions = this.questions;
      if (type) {
        filteredQuestions = this.questions.filter(q => q.type === type);
      }
      if (filteredQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        return filteredQuestions[randomIndex].question;
      }
      return null;
    },
    async fetchAndPreviewQuestions(userInput: string) {
      const questions = await useChatGPT(userInput);
      if (questions.length > 0) {
        this.generatedQuestions = questions;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('gameStore', JSON.stringify(this.$state));
    },
    loadFromLocalStorage() {
      const savedState = localStorage.getItem('gameStore');
      if (savedState) {
        this.$state = JSON.parse(savedState);
      }
    },
  },
  persist: false,
});
