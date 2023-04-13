import React from "react";
import { TeamType } from "../../models";
import {
  TeamMenuFormControl,
  TeamMenuInputLabel,
  TeamMenuSelect,
  TeamMenuItem,
} from "./styledComponents";
interface Props {
  teams: TeamType[];
  selectedTeam?: TeamType;
  setSelectedTeam: React.Dispatch<React.SetStateAction<TeamType | undefined>>;
}

const TeamSelectorMenu = ({ teams, selectedTeam, setSelectedTeam }: Props) => {
  return (
    <TeamMenuFormControl variant="standard">
      <TeamMenuInputLabel>Select Team</TeamMenuInputLabel>
      <TeamMenuSelect
        value={selectedTeam ? selectedTeam : ""}
        // @ts-ignore
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        {teams.map((team: TeamType) => (
          // @ts-ignore
          <TeamMenuItem key={team.id} value={team}>
            {team?.team_name}
          </TeamMenuItem>
        ))}
      </TeamMenuSelect>
    </TeamMenuFormControl>
  );
};

export default TeamSelectorMenu;
