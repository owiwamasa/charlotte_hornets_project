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

const calculate_shooting_pct_change_in_average = (box_scores, stat_name) => {
  const stat_made = pct_to_makes_and_attempts[stat_name][0];
  const stat_attempt = pct_to_makes_and_attempts[stat_name][1];
  let made_sum = 0;
  let attempt_sum = 0;
  let res = [];
  for (let i = 0; i < box_scores.length; i++) {
    let box_score = box_scores[i];
    made_sum += box_score[stat_made];
    attempt_sum += box_score[stat_attempt];

    res.push(math_round((made_sum / attempt_sum) * 100, 1));
  }
  return res;
};

const calculate_game_total_and_season_avg_data = (box_scores, stat_name) => {
  let season_avg;
  if (!stat_name.includes("pct")) {
    season_avg = calculate_change_in_average_by_game(box_scores, stat_name);
  } else {
    season_avg = calculate_shooting_pct_change_in_average(
      box_scores,
      stat_name
    );
  }
  const formatted_data = box_scores.map((box_score, index) => ({
    game_number: index + 1,
    game_total: box_score[stat_name],
    avg: season_avg[index],
  }));
  return formatted_data;
};

const calculate_player_pct_of_team_totals = async (
  player_box_scores,
  stat_name,
  team_id
) => {
  let player_sum = 0;
  let team_sum = 0;
  let res = [];

  for (let i = 0; i < player_box_scores.length; i++) {
    let box_score = player_box_scores[i];
    let player_stat = box_score[stat_name];
    player_sum += player_stat;

    let team_box_score = await TeamBoxScore.findOne({
      where: { game_id: box_score.game_id, team_id },
    });
    team_sum += team_box_score[stat_name];
    res.push({
      game_number: i + 1,
      game_total:
        player_sum !== 0 || team_sum !== 0
          ? math_round((player_stat / team_box_score[stat_name]) * 100, 1)
          : 0,
      avg:
        player_sum !== 0 || team_sum !== 0
          ? math_round((player_sum / (i + 1) / (team_sum / (i + 1))) * 100, 1)
          : 0,
    });
  }
  return res;
};

const calculate_shooting_pct_location_data = (shooting_location_data) => {
  const shooting_data_filtered_keys = Object.keys(
    shooting_location_data.dataValues
  ).filter(
    (key) => !["id", "person_id", "createdAt", "updatedAt"].includes(key)
  );

  return shooting_data_filtered_keys.map((key) => ({
    name: location_snake_case_to_name[key],
    value: shooting_location_data.dataValues[key],
  }));
};

const pct_to_makes_and_attempts = {
  fg_pct: ["fg", "fga"],
  three_pct: ["three_make", "three_attempt"],
  ft_pct: ["ftm", "fta"],
};

const location_snake_case_to_name = {
  paint_pct: "Paint",
  top_three_pct: "Top 3",
  left_wing_three_pct: "L Wing 3",
  right_wing_three_pct: "R Wing 3",
  left_corner_three_pct: "L Corner 3",
  right_corner_three_pct: "R Corner 3",
  midrange_pct: "Midrange",
};

module.exports = {
  async_handler,
  math_round,
  calculate_change_in_average_by_game,
  calculate_player_pct_of_team_totals,
  calculate_shooting_pct_change_in_average,
  location_snake_case_to_name,
  calculate_game_total_and_season_avg_data,
  calculate_shooting_pct_location_data,
};
