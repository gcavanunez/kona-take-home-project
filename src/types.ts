// One team can have multiple managers => One team can only have a manager

// only teams with a channel_id in the settings key are the primary teams => the top of the tree

// Primary team has in the settings obj a key where all the check ins are sent to
// Consolidated teams points downwards
// Primary that points to itself -> is the top of the tree

/**
 * Posible functions to sort the data
 * map of users => uid => realname || getUsers -> get all users from the organization
 * map of teams => uid -> team data || getTeams
 * map of sorted teams => uid -> team leaf || sortTeams
 */
export interface User {
  realName: string
  manager: string[]
  s_manager: string[] // also a manager
  teams?: { [key: string]: Team }
}

export interface Team {
  name: string
  directs: string[] // people in the team, s_manager can be a direct in the team
  s_manager: string[]
  settings: Settings
}

export interface Settings {
  channel_id?: string
  consolidatedPrimaryTeam?: string
  consolidatedTeams?: string[]
}

export interface Channel {
  name: string
  private: boolean
}
export interface Member {
  realName: string
  uid: string
  is_manager: boolean
}

export type KonaUsers = Record<string, User>
export type KonaChannels = Record<string, Channel>
export type Teams = Record<string, Team>
export interface TeamLeaf extends Team {
  children?: Record<string, TeamLeaf>
  channel?: Channel
  members: Member[]
}
export type TeamTree = Record<string, TeamLeaf>
