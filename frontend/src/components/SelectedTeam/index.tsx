import React from "react";
import TeamSelectorMenu from "./TeamSelectorMenu";
import {
  SelectedTeamContainer,
  TeamNameHeader,
  CircularLogoBackground,
  TeamHeaderContainer,
} from "./styledComponents";

const SelectedTeam = ({ teams, selectedTeam, setSelectedTeam }: any) => {
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
