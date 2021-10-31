import { createMachine, assign } from "xstate";
import nouns from "./nouns";

// @todo - Need to show and keep track of what words were guessed in the round

const postFetch = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

// key: number of players
// value: number of Fairies, Boogeymen, Sandmen
const playersToSpiritsMap = {
  4: [1, 1, 2],
  5: [2, 1, 2],
  6: [3, 2, 1],
  7: [3, 2, 2],
  8: [4, 3, 1],
  9: [4, 3, 2],
  10: [5, 4, 1],
};

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getSpiritsArray(players) {
  const spiritMap = playersToSpiritsMap[players.length];
  const Fairies = new Array(spiritMap[0]).fill("Fairy");
  const Boogeymen = new Array(spiritMap[1]).fill("Boogeyman");
  const Sandmen = new Array(spiritMap[2]).fill("Sandman");
  const combinedShuffledSpirits = shuffle([
    ...Fairies,
    ...Boogeymen,
    ...Sandmen,
  ]);
  return combinedShuffledSpirits;
}
export default createMachine(
  {
    initial: "setup",
    context: {
      players: [],
      nouns: shuffle(nouns),
      currentNounIndex: 0,
      // Round context
      guessedAnswers: []
    },
    states: {
      setup: {
        id: "setup",
        initial: "loadCurrentPlayers",
        states: {
          loadCurrentPlayers: {
            invoke: {
              src: "loadCurrentPlayers",
              onDone: {
                target: "idle",
                actions: "setCurrentPlayers",
              },
              onError: {
                target: "idle",
                actions: "loadCurrentPlayersFailed",
              },
            },
          },
          idle: {
            on: {
              ADD_PLAYER: {
                target: "adding",
              },
              UPDATE_PLAYER: {
                target: "updating",
              },
              DELETE_PLAYER: {
                target: "deleting",
              },
              NEXT: {
                target: "#night",
              },
            },
          },
          adding: {
            invoke: {
              src: "addPlayer",
              onDone: {
                actions: "addPlayer",
                target: "idle",
              },
              onError: {
                actions: "addingPlayerFailed",
                target: "idle",
              },
            },
          },
          updating: {
            invoke: {
              src: "updatePlayer",
              onDone: {
                actions: "updatePlayer",
                target: "idle",
              },
              onError: {
                actions: "updatingPlayerFailed",
                target: "idle",
              },
            },
          },
          deleting: {
            invoke: {
              src: "deletePlayer",
              onDone: {
                actions: "deletePlayer",
                target: "idle",
              },
              onError: {
                actions: "deletingPlayerFailed",
                target: "idle",
              },
            },
          },
        },
      },
      night: {
        id: "night",
        initial: "selectDreamer",
        states: {
          selectDreamer: {
            on: {
              SELECT_DREAMER: {
                actions: ["setDreamer", "shuffleCharacters"],
              },
              NEXT: {
                target: "saveCharacters",
              },
            },
          },
          saveCharacters: {
            invoke: {
              src: "saveCharacters",
              onDone: {
                target: "waitingRoom",
              },
              onError: {
                actions: "saveCharactersFailed",
                target: "selectDreamer",
              },
            },
          },
          waitingRoom: {
            on: {
              NEXT: {
                target: "guessing",
              },
            },
          },
          guessing: {
            after: {
              120000: { target: "finalGuess" },
              // 5000: { target: "finalGuess" },
            },
            on: {
              CORRECT: {
                actions: ["addToCorrect", "nextNoun"],
              },
              WRONG: {
                actions: ["addToWrong", "nextNoun"],
              },
              PASS: {
                actions: ["addToWrong", "nextNoun"],
              },
              PENALTY: {
                actions: ["assignPenalty", "nextNoun"],
              },
            },
          },
          finalGuess: {
            on: {
              CORRECT: {
                actions: ["addToCorrect", "nextNoun"],
                target: "#day",
              },
              WRONG: {
                actions: ["addToWrong", "nextNoun"],
                target: "#day",
              },
              PASS: {
                actions: ["nextNoun"],
                target: "#day",
              },
              PENALTY: {
                actions: ["assignPenalty", "nextNoun"],
                target: "#day",
              },
            },
          },
        },
      },
      day: {
        id: "day",
        initial: "recountTheDream",
        states: {
          recountTheDream: {
            exit: ["calculateScores"],
            on: {
              CORRECT: {
                target: "showScores",
              },
              WRONG: {
                target: "showScores",
              },
            },
          },
          showScores: {
            exit: ["resetRound"],
            on: {
              NEXT: {
                target: "#night",
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      resetRound: assign({
        guessedAnswers: () => [],
      }),
      calculateScores: assign({
        players: (ctx, evt) => {
          const giveDreamerExtraPoints = evt.type === "CORRECT";
          const numberOfCorrectAnswers = ctx.guessedAnswers.filter(
            (guess) => guess.status === "correct"
          ).length;
          const numberOfWrongAnswers = ctx.guessedAnswers.filter(
            (guess) => guess.status === "wrong"
          ).length;
          const penalties = ctx.guessedAnswers.filter(
            (guess) => guess.status === "penalty"
          );
          const absoluteDiffBetweenCorrectAndWrongAnswers = Math.abs(
            numberOfCorrectAnswers - numberOfWrongAnswers
          );
          return ctx.players.map((player) => {
            player.score = player.score || 0; // init score if it hasn't been set yet
            player.scoreChange = 0;
            let scoreChange = 0;
            penalties.forEach((penalty) => {
              if (player.id == penalty.id) {
                scoreChange = scoreChange - 1;
              }
            });
            if (player.character === "Dreamer" && giveDreamerExtraPoints) {
              scoreChange = scoreChange + 2;
            }
            if (
              player.character === "Dreamer" ||
              player.character === "Fairy"
            ) {
              scoreChange = scoreChange + numberOfCorrectAnswers;
            }
            if (player.character === "Boogeyman") {
              scoreChange = scoreChange + numberOfWrongAnswers;
            }
            if (player.character === "Sandman") {
              if (numberOfCorrectAnswers === numberOfWrongAnswers) {
                // If there is the same number of correct and wrong answers, score 1 point for each correct answers and 2 extra points
                scoreChange = scoreChange + numberOfCorrectAnswers + 2;
              } else if (absoluteDiffBetweenCorrectAndWrongAnswers === 1) {
                // If there is a 1 answer difference, score 1 point for each answer on the side with the most
                scoreChange =
                  scoreChange +
                  (numberOfCorrectAnswers > numberOfWrongAnswers
                    ? numberOfCorrectAnswers
                    : numberOfWrongAnswers);
              } else {
                // If there is a difference of 2 or more, score 1 point for each answer on the side with the fewest
                scoreChange =
                  scoreChange +
                  (numberOfCorrectAnswers > numberOfWrongAnswers
                    ? numberOfWrongAnswers
                    : numberOfCorrectAnswers);
              }
            }
            player.score = player.score + scoreChange;
            player.scoreChange = scoreChange;
            return player;
          });
        },
      }),
      assignPenalty: assign({
        guessedAnswers: (ctx, evt) => [
          ...ctx.guessedAnswers,
          { noun: evt.noun, id: evt.id, name: evt.name, status: "penalty" },
        ],
      }),
      addToWrong: assign({
        guessedAnswers: (ctx, evt) => [
          ...ctx.guessedAnswers,
          { noun: evt.noun, status: "wrong" },
        ],
      }),
      nextNoun: assign({ currentNounIndex: (ctx) => ctx.currentNounIndex + 1 }),
      addToCorrect: assign({
        guessedAnswers: (ctx, evt) => [
          ...ctx.guessedAnswers,
          { noun: evt.noun, status: "correct" },
        ],
      }),
      saveCharactersFailed: (_, evt) => {
        alert(evt.data.message);
      },
      shuffleCharacters: assign({
        players: (ctx, evt) => {
          const shuffledSpirits = getSpiritsArray(ctx.players);
          const playersWithAssingedCharacters = ctx.players.map(
            (player, index) => {
              if (player.character !== "Dreamer") {
                player.character = shuffledSpirits[index];
              }
              return player;
            }
          );
          return playersWithAssingedCharacters;
        },
      }),
      setDreamer: assign({
        players: (ctx, evt) =>
          ctx.players.map((player) => {
            let character = "";
            if (player.id === evt.id) {
              character = "Dreamer";
            }
            return { ...player, character };
          }),
      }),
      deletingPlayerFailed: () => {},
      deletePlayer: assign({
        players: (ctx, evt) =>
          ctx.players.filter((player) => player.id !== evt.data.id),
      }),
      updatingPlayerFailed: (_, evt) => {
        alert(evt.data.message);
      },
      updatePlayer: assign({
        players: (ctx, evt) =>
          ctx.players.map((player) => {
            if (player.id === evt.data.player.id) {
              return evt.data.player;
            }
            return player;
          }),
      }),
      addingPlayerFailed: (_, evt) => {
        alert(evt.data.message);
      },
      addPlayer: assign({
        players: (ctx, evt) => [...ctx.players, evt.data.player],
      }),
      loadCurrentPlayersFailed: (_, evt) => {
        alert(evt.data.message);
      },
      setCurrentPlayers: assign({ players: (_, evt) => evt.data.players }),
    },
    services: {
      saveCharacters: async (ctx, evt) => {
        const res = await postFetch("/api/saveCharacters", {
          players: ctx.players.map((player) => ({
            id: player.id,
            character: player.character,
          })),
        });
        if (!res.ok) {
          throw new Error("Could not save characters");
        }
      },
      deletePlayer: async (_, evt) => {
        const res = await postFetch("/api/deletePlayer", {
          id: evt.id,
        });
        if (!res.ok) {
          throw new Error("Could not delete player");
        }
        return { id: evt.id };
      },
      updatePlayer: async (_, evt) => {
        const res = await postFetch("/api/updatePlayer", {
          id: evt.id,
          name: evt.name,
        });
        if (!res.ok) {
          throw new Error("Could not update player");
        }
        return await res.json();
      },
      addPlayer: async (_, evt) => {
        const res = await postFetch("/api/addPlayer", { name: evt.name });
        if (!res.ok) {
          throw new Error("Could not add players");
        }
        return await res.json();
      },
      loadCurrentPlayers: async () => {
        const res = await fetch("/api/getPlayers");
        if (!res.ok) {
          throw new Error("Could not load players");
        }
        return await res.json();
      },
    },
  }
);
