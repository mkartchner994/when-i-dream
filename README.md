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

Once player names have been added and the character url has been shared with players as described in the Host Setup section above, the host can select "Next" and move onto the "Select a Dreamer" step. Each player should have a chance to be the Dreamer 1 time throughout the game. To start the game, choose the first player in the players list and select "Next" to move onto the "Dream Spirit" step.

## Roles

In the "Dream Spirt" step roles are randomly assinged to all other players besides the chosen Dreamer. The below table shows what possible roles could be assinged given the number of players. Each player should select their own name from the https://{something}.ngrok.io/characters url given to see which role they have been assinged for the round. (Players should only view their own roles - makes it more fun! If you are into the second or later round the players can just refresh their character page to see their new role.)

| Number of Players | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| ----------------- | --- | --- | --- | --- | --- | --- | --- |
| Fairies           | 1   | 2   | 3   | 3   | 4   | 4   | 5   |
| Boogeymen         | 1   | 1   | 2   | 2   | 3   | 3   | 4   |
| Sandmen           | 2   | 2   | 1   | 2   | 1   | 2   | 1   |

- Fairies must help the Dreamer indentify the most "dreams" (words).
- Boogeymen must trick the Dreamer into giving incorrect guesses.
- Sandmen alternate between helping the Fairies and Boogeymen so the Dreamer gives an equal number of correct and incorrect guesses.

Once players know their roles, have the Dreamer close their eyes (they should not see the "dream" words during the round!) and then select "Next" to move onto the Night phase.

## Night Phase

Starting with the player following the Dreamer on the players list, each player gives a single-word clue to describe the "dream" (word). Proceed this way until the Dreamer interrupts to guess the word. As a result, it is possible for players to give multiple single-word clues for a single "dream". The players cannot give clues that are derived from the word, or clues that sound similar, or even translate the word into another language.

At any point, the Dreamer can interrupt to give one, and only one, guess:

- If the Dreamer is correct, select the "Correct" button.
- If the Dreamer is incorrect, select the "Wrong" button.

Then, players resume taking turns and proceed with the newly revealed word.

> **Important:** The Dreamer cannot know whether their answer was right or wrong. Players must remain discreet!

When the two minutes are over, the Dreamer may give one last answer (this is not mandatory and will not be counted towards the "Wrong" guesses if passed).

> Clarifications
> - If the Dreamer is confused and has no ideas, they can skip the current word by saying: "Pass". The word is then counted towards the "Wrong" guesses.
> - If a player cannot find a good clue, they can skip their turn by saying: "Pass".
> - If a player takes more than 5 seconds to give their clue, their turn should be skipped.
> - If a player gives an improper clue, select the button with that player's name to assign them a 1 point penalty. Proceed with the newly revealed word but make sure the Dreamer knows the word has changed.

## Day Phase

### Recount the Dream

Before opening their eyes, the Dreamer recounts their dream and tries to mention all the words they guessed during the night. As you recount the dream, feel free to dramatize your dream. Be inspired by your answers to create a dreamy, funny, zany story. For example: 

> "In my dream, I saw a ROOSTER who fought against a VAMPIRE for a HAMBURGER while a DOG was playing DRUMS"

When the Dreamer has finished recounting their dream, they may open their eyes. If the Dreamer is able to mention all the "Correct" guesses when recounting the dream select the "Correct" button. This will give the Dreamer 2 extra points. Select either the "Correct" or "Wrong" button to move on to see the the current scores for the round. After reviewing the scores, you can select "Next" to chose the next Dreamer and start a new round.

### Scoring Points

- Fairies score 1 point for each correct guess.
- Boogeymen score 1 point for each incorrect guess.
- Sandmen compare the number of correct and incorrect guesses.
    - If the numbers are the same, they score a point for each correct guess and 2 extra points.
    - If there is a difference of 1, they score a number of points equal to the greater of these two numbers.
    - If there is a difference of 2 or more, they score a number of points equal to the smaller of these two numbers.

## End of Game

When all the players have been the Dreamer once, the game ends. The player with the most points wins.

# Built With

- [Next.js](https://nextjs.org/docs/getting-started)
- [XState](https://xstate.js.org/docs/)
- [Prisma](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)