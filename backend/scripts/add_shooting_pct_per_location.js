const db = require("../models");
const { math_round } = require("../utils");
const { Op } = require("sequelize");
const { Player, Event, PlayerShootingLocationPct } = db;

const add_shooting_pct_per_location = async () => {
  const players = await Player.findAll();
  for (let i = 0; i < players.length; i++) {
    let person_id = players[i].id;
    let paint_pct = await get_paint_pct(person_id);
    let top_three_pct = await get_top_three_pct(person_id);
    let left_wing_three_pct = await get_left_wing_three_pct(person_id);
    let right_wing_three_pct = await get_right_wing_three_pct(person_id);
    let left_corner_three_pct = await get_left_corner_three_pct(person_id);
    let right_corner_three_pct = await get_right_corner_three_pct(person_id);
    let midrange_pct = await get_midrange_pct(person_id);
    let data = {
      person_id,
      paint_pct,
      top_three_pct,
      left_wing_three_pct,
      right_wing_three_pct,
      left_corner_three_pct,
      right_corner_three_pct,
      midrange_pct,
    };
    let player_shooting_location_pct =
      await create_player_shooting_location_pct(data);
  }
};

const create_player_shooting_location_pct = async (data) => {
  const player_shooting_location_pct = await PlayerShootingLocationPct.create(
    data
  );
  return player_shooting_location_pct;
};

const get_paint_pct = async (person_id) => {
  const paint_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [-80, 80],
      },
      loc_y: {
        [Op.between]: [-35, 150],
      },
    },
  });
  return calculate_shooting_pct(paint_shots);
};

const get_top_three_pct = async (person_id) => {
  const top_three_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [-80, 80],
      },
      loc_y: {
        [Op.between]: [150, 430],
      },
      stat: {
        [Op.or]: ["MISSED_THREE_POINT", "THREE_POINT_MADE"],
      },
    },
  });
  return calculate_shooting_pct(top_three_shots);
};

const get_left_wing_three_pct = async (person_id) => {
  const left_wing_three_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [80, 245],
      },
      loc_y: {
        [Op.between]: [150, 430],
      },
      stat: {
        [Op.or]: ["MISSED_THREE_POINT", "THREE_POINT_MADE"],
      },
    },
  });
  return calculate_shooting_pct(left_wing_three_shots);
};

const get_right_wing_three_pct = async (person_id) => {
  const right_wing_three_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [-245, -80],
      },
      loc_y: {
        [Op.between]: [150, 430],
      },
      stat: {
        [Op.or]: ["MISSED_THREE_POINT", "THREE_POINT_MADE"],
      },
    },
  });
  return calculate_shooting_pct(right_wing_three_shots);
};

const get_left_corner_three_pct = async (person_id) => {
  const left_corner_three_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [80, 245],
      },
      loc_y: {
        [Op.between]: [-35, 150],
      },
      stat: {
        [Op.or]: ["MISSED_THREE_POINT", "THREE_POINT_MADE"],
      },
    },
  });
  return calculate_shooting_pct(left_corner_three_shots);
};

const get_right_corner_three_pct = async (person_id) => {
  const right_corner_three_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [-245, -80],
      },
      loc_y: {
        [Op.between]: [-35, 150],
      },
      stat: {
        [Op.or]: ["MISSED_THREE_POINT", "THREE_POINT_MADE"],
      },
    },
  });
  return calculate_shooting_pct(right_corner_three_shots);
};

const get_midrange_pct = async (person_id) => {
  const top_midrange_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [-80, 80],
      },
      loc_y: {
        [Op.between]: [150, 430],
      },
      stat: {
        [Op.or]: ["MISSED_TWO_POINT", "TWO_POINT_MADE"],
      },
    },
  });
  const left_midrange_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [80, 245],
      },
      stat: {
        [Op.or]: ["MISSED_TWO_POINT", "TWO_POINT_MADE"],
      },
    },
  });
  const right_midrange_shots = await Event.findAll({
    where: {
      person_id,
      loc_x: {
        [Op.between]: [-245, -80],
      },
      stat: {
        [Op.or]: ["MISSED_TWO_POINT", "TWO_POINT_MADE"],
      },
    },
  });
  return calculate_shooting_pct([
    ...top_midrange_shots,
    ...left_midrange_shots,
    ...right_midrange_shots,
  ]);
};

const calculate_shooting_pct = (shots) => {
  let made = shots.filter((shot) => shot.stat.includes("MADE"));
  return made.length ? math_round((made.length / shots.length) * 100, 1) : 0;
};

add_shooting_pct_per_location(5134);
