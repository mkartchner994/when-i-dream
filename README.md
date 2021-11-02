# When I Dream - Remote

This is a remote friendly game 
inspired by the board game [When I Dream](https://boardgamegeek.com/boardgame/198454/when-i-dream).

# Host Setup for Remote Play

Currently, this game is intended to be facilitated by a host who can run the game on their computer, open a tunnel to expose a localhost web server, and share their screen on a video call (zoom or other). Below shows how to do this with the [ngrok](https://ngrok.com/docs) tunnel service but it can also be done with other similar services.

1. `git clone https://github.com/mkartchner994/when-i-dream.git`
1. `npm i`
1. `npx prisma migrate dev`
1. `npm run build`
1. `npm run start`
1. Open http://localhost:3000/ in your browser
1. Add player names - 4 to 10
1. `ngrok http 3000` - share the character url with players - https://{something}.ngrok.io/characters

You can then walk through the overview, objective, and game play with the players.

# Game Overview and Objective

This game is played over a series of rounds equal to the number of players. Each round is divided into two phases: Night and Day. Each round, one player plays as the Dreamer who must identify "dreams" (words) based on the clues given by the other players. (Fairies, Boogeymen, and Sandmen)

At the end of the game, the player with the most points wins.

# Game Play

Once player names have been added and the character url has been shared with players as described in the Host Setup section above, the host can select "Next" and move onto the "Select a Dreamer" step. Each player should have a chance to be the dreamer 1 time throughout the game. To start the game, choose the first player in the players list and select "Next" to move onto the "Dream Spirit" step.

## Roles

In the "Dream Spirt" step roles are randomly assinged to all other players besides the chosen Dreamer. The below table shows what possible roles could be assinged given the number of players. Each player should select their own name from the https://{something}.ngrok.io/characters url given to see which role they have been assinged for the round. (Players should only view their own roles - makes it more fun!)

| Number of Players | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| ----------------- | --- | --- | --- | --- | --- | --- | --- |
| Fairies           | 1   | 2   | 3   | 3   | 4   | 4   | 5   |
| Boogeymen         | 1   | 1   | 2   | 2   | 3   | 3   | 4   |
| Sandmen           | 2   | 2   | 1   | 2   | 1   | 2   | 1   |

- Fairies must help the Dreamer indentify the most "dreams" (words).
- Boogeymen must trick the Dreamer into giving incorrect guesses.
- Sandmen alternate between helping the Fairies and Boogeymen so that the Dreamer gives an equal number of correct and incorrect guesses.

## Night Phase

Todo

## Day Phase

Todo
# Built With

- [Next.js](https://nextjs.org/docs/getting-started)
- [XState](https://xstate.js.org/docs/)
- [Prisma](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)