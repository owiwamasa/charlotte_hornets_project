const db = require("./models/index.js");
const { TeamBoxScore } = db;

const async_handler = (handler) => {
  return (req, res, next) => {
    return handler(req, res, next).catch(next);
  };
};

const math_round = (value, precision) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};

const calculate_change_in_average_by_game = (box_scores, stat_name) => {
  let sum = 0;
  let res = [];

  for (let i = 0; i < box_scores.length; i++) {
    let box_score = box_scores[i];
    sum += box_score[stat_name];
    res.push(math_round(sum / (i + 1), 1));
  }

  return res;
};

const calculate_player_pct_of_team_totals = async (
  player_box_scores,
  stat_name
) => {
  let player_sum = 0;
  let team_sum = 0;
  let res = {
    pct_of_team_total_per_game: [],
    pct_of_team_total_season_avg: [],
  };

  for (let i = 0; i < player_box_scores.length; i++) {
    let box_score = player_box_scores[i];
    let player_stat = box_score[stat_name];
    player_sum += player_stat;

    let team_box_score = await TeamBoxScore.findOne({
      where: { game_id: box_score.game_id },
    });
    res.per_game.push(
      math_round((player_stat / team_box_score[stat_name]) * 100, 1)
    );
    team_sum += team_box_score[stat_name];
    res.season_avg.push(math_round((player_sum / team_sum) * 100, 1));
  }

  return res;
};

module.exports = {
  async_handler,
  math_round,
  calculate_change_in_average_by_game,
  calculate_player_pct_of_team_totals,
};
