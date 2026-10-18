# Ludo-Go

A short, two-player take on Nigerian Ludo, designed for a Snapchat game. Each game lasts about a minute: three pieces each, three throws of two dice each, and the player who gets the most pieces home (or closest to home) wins.

This repo holds the browser prototype used to test the rules and balance before the Snapchat build.

## Play it

Play online at **https://khal33d-hub.github.io/ludo-go/**, or open `index.html` in any browser. It's a single file with no build step. Play pass-and-play with a friend, or set Yellow to the bot.

## Game types

| | Ludo-Go Classic | Ludo-Go Battle |
|---|---|---|
| Capture rule | Normal Kill | Kill to Finish |
| Your capturing piece | Stays on the square and keeps playing | Finishes and counts as home straight away |
| Captured piece | Goes back to its house for the rest of the game | Goes back to its house for the rest of the game |

## Rules

- 3 pieces each, already on the track. No 6 needed to come out.
- 3 throws of two dice. Use each die on any piece, or both on one piece.
- Only a double 6 gives an extra throw.
- One safe star square on each side of the board. Nobody can be killed on one.
- A throw past home still counts as home by default. You can switch to needing the exact number in the settings.
- To win: most pieces home after all throws. If that's level, fewest squares left wins.

### Starting layouts

- **Runners & hunter (default):** two pieces near home, plus one hunter sitting just behind the opponent's two near-home pieces. On a real Ludo track, pieces near their own homes never cross, so the hunter is what makes kills possible.
- **All near home:** three pieces near home. This is a pure race and kills can't happen.

Layouts are mirrored for both players, with a little randomness each game. Rematches swap who throws first.

## Balance check

The prototype has a built-in balance check that plays 2,000 bot-against-bot games. You can also run it from the command line:

```
node scripts/simulate.js 4000
```

The bots pick the best-looking move for each throw, so treat the numbers as a rough guide.

## Code layout

`index.html` has two scripts:

1. **Engine:** the pure game rules (moves, kills, turns, scoring, the bot and the simulator), with no DOM code. This is the part to port to the Snapchat build.
2. **UI:** board drawing, animation, settings, game log and the record of your games.

Track positions use `rel`, the number of steps a piece has travelled from its start square: 0–50 is the shared track, 51–55 is the home column and 56 is home.
