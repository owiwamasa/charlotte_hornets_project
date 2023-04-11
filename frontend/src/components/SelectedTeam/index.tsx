import React from "react";
import TeamSelectorMenu from "./TeamSelectorMenu";
import {
  SelectedTeamContainer,
  TeamNameHeader,
  CircularLogoBackground,
  TeamHeaderContainer,
} from "./styledComponents";
import { TeamType } from "../../models";

interface Props {
  teams: TeamType[];
  selectedTeam?: TeamType;
  setSelectedTeam: React.Dispatch<React.SetStateAction<TeamType | undefined>>;
}

const SelectedTeam = ({ teams, selectedTeam, setSelectedTeam }: Props) => {
  return (
    <SelectedTeamContainer>
      <TeamHeaderContainer>
        <CircularLogoBackground sx={{}}>
          <img
            src={selectedTeam?.logo_url}
            alt="team logo"
            height="60px"
            width="auto"
          />
        </CircularLogoBackground>
        <TeamNameHeader sx={{}}>{selectedTeam?.team_name}</TeamNameHeader>
      </TeamHeaderContainer>
      <TeamSelectorMenu
        teams={teams}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
    </SelectedTeamContainer>
  );
};

export default SelectedTeam;
