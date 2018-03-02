export class Player {
    //General Information
    ID: number;
    LastName: string;
    FirstName: string;
    JerseyNumber: number;
    Position: string;

    //Standings
    GamesPlayed: number;
    Wins: number;
    Losses: number;
    WinPct: number;
    GamesBack: number;

    /**
     * Season Totals
     */
    //Offense
    Fg2PtAtt: number;
    Fg2PtMade: number;
    Fg2PtPct: number;
    Fg3PtAtt: number;
    Fg3PtMade: number;
    Fg3PtPct: number;
    FgAtt: number;
    FgMade: number;
    FgPct: number;
    FtAtt: number;
    FtMade: number;
    FtPct: number;
    OffReb: number;
    Pts: number;
    Ast: number;
    Tov: number;
    BlkAgainst: number;

    //Defense
    DefReb: number;
    Reb: number;
    Stl: number;
    Blk: number;
    PtsAgainst: number;
    
    //Misc
    Fouls: number;
    FoulsDrawn: number;
    FoulPers: number;
    FoulPersDrawn: number;
    FoulTech: number;
    FoulTechDrawn: number;
    FoulFlag1: number;
    FoulFlag1Drawn: number;
    FoulFlag2: number;
    FoulFlag2Drawn: number;
    Ejections: number;
    PlusMinus: number;

    /**
     * Stats Per Game
     */

    //Offense
    Fg2PtAttPerGame: number;
    Fg2PtMadePerGame: number;
    Fg3PtAttPerGame: number;
    Fg3PtMadePerGame: number;
    FgAttPerGame: number;
    FgMadePerGame: number;
    FtAttPerGame: number;
    FtMadePerGame: number;
    OffRebPerGame: number;
    AstPerGame: number;
    PtsPerGame:number;
    TovPerGame: number;
    BlkAgainstPerGame: number;

    //Defense
    DefRebPerGame: number;
    RebPerGame: number;
    StlPerGame:number;
    BlkPerGame: number;
    PtsAgainstPerGame: number;

    //Misc
    FoulsPerGame: number;
    FoulsDrawnPerGame: number;
    FoulPersPerGame: number;
    FoulPersDrawnPerGame: number;
    FoulTechPerGame: number;
    FoulTechDrawnPerGame: number;
    FoulFlag1PerGame: number;
    FoulFlag1DrawnPerGame: number;
    FoulFlag2PerGame: number;
    FoulFlag2DrawnPerGame: number;
    PlusMinusPerGame: number;


    constructor(){
        this.LastName = '';
        this.FirstName = '';
        this.JerseyNumber = 0;
        this.Position = '';
	}
}
