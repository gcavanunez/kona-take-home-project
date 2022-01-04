import type { InferGetServerSidePropsType, NextPage } from 'next'
import { KonaChannels, KonaUsers, Member, Team, TeamLeaf, Teams, TeamTree, User } from '../types'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon, StarIcon, XIcon } from '@heroicons/react/outline'
import {
  EyeOffIcon,
  HashtagIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
} from '@heroicons/react/solid'

/**
 * I know it wasn't part of the task, helped me get in context of a dashboard setting
 */
const Layout: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-80" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-150 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-md focus:outline-none focus:ring focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 py-6 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-12 w-auto" src="/kona-logo.png" alt="Kona" />
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-16" />
        </Dialog>
      </Transition.Root>

      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col py-6 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-12 w-auto" src="/kona-logo.png" alt="Kona" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 flex justify-end">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring focus:ring-inset focus:ring-kona-green-light"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
const ChildrenTeams: React.FC<{ teams?: TeamTree }> = ({ teams }: { teams?: TeamTree }) => {
  return (
    <ul className="space-y-2 mt-4">
      {teams &&
        Object.entries(teams).map(([child_team_uid, child_team_data]) => {
          return <ChildTeam team={child_team_data} key={child_team_uid} />
        })}
    </ul>
  )
}
const ChildTeam: React.FC<{ team: TeamLeaf }> = ({ team }: { team: TeamLeaf }) => {
  return (
    <div>
      <details
        className="open:bg-white  open:ring-1 open:ring-black/5  open:shadow-sm p-4 lg:p-6 rounded-md"
        open
      >
        <summary className="cursor-pointer text-sm leading-6 text-gray-900  font-semibold select-none">
          {team.name}
        </summary>
        <div className="mt-3 text-sm leading-6 text-gray-600 ">
          <div className="">
            <dt className="sr-only">Users</dt>
            <dd className="flex justify-start  -space-x-1">
              {team.members.map((member) => (
                <div className="relative" key={member.uid}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${member.realName.replace(
                      ' ',
                      '+'
                    )}&color=24a23f&background=D6EBDA`}
                    alt={member.realName}
                    title={member.realName}
                    className="w-10 h-10 rounded-full bg-gray-100 ring-2 ring-white "
                    loading="lazy"
                  />
                  {member.is_manager && (
                    <div className="absolute bottom-0 left-0 bg-gray-700 p-0.5 rounded-full">
                      <ShieldCheckIcon className="w-3 h-3 text-gray-50" />
                    </div>
                  )}
                </div>
              ))}
            </dd>
          </div>
          <ChildrenTeams teams={team.children} />
        </div>
      </details>
    </div>
  )
}
const Home: NextPage<{ sorted_teams: TeamTree }> = ({
  sorted_teams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mt-6 shadow overflow-hidden rounded-md">
            <header className="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 ">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
                <button className=" flex items-center rounded-md bg-kona-green text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm hover:bg-opacity-80 transition focus:outline-none focus:ring focus:ring-kona-green-lightest">
                  <PlusIcon className="mr-2 w-5 h-5" />
                  New
                </button>
              </div>
              <div className="group relative rounded-md ">
                <SearchIcon className="absolute left-3 top-1/2 -mt-2.5 text-gray-400 pointer-events-none group-focus-within:text-kona-green w-5 h-5" />
                <input
                  type="text"
                  aria-label="Filter teams"
                  placeholder="Filter teams..."
                  className="w-full text-sm leading-6 bg-transparent text-gray-900 placeholder:text-gray-400 rounded-md py-2 pl-10 ring ring-gray-200 shadow-sm focus:outline-none focus:ring focus:ring-kona-green"
                />
              </div>
            </header>
            <ul className="bg-gray-100 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 gap-4 text-sm leading-6 ">
              {Object.entries(sorted_teams).map(([team_uid, team]) => (
                <li
                  key={team_uid}
                  className=" rounded-md p-4 lg:p-6 bg-white  shadow-sm  hover:shadow-md transition "
                >
                  <dl className="grid items-center">
                    <div className="flex justify-between">
                      <div>
                        <div>
                          <dt className="sr-only">Title</dt>
                          <dd className="font-semibold text-gray-900  text-lg  md:text-xl ">
                            {team.name}
                          </dd>
                        </div>
                        <div>
                          <dt className="sr-only">Channel</dt>
                          <dd className=" text-sm leading-4 font-medium text-gray-500 flex items-center">
                            <div className="shrink-0">
                              {team.channel.private ? (
                                <EyeOffIcon className="w-4 h-4 " />
                              ) : (
                                <HashtagIcon className="w-4 h-4 " />
                              )}
                            </div>
                            <div className="ml-1">{team.channel.name}</div>
                          </dd>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring focus:ring-kona-green-light"
                      >
                        <StarIcon className="w-5 h-5" />
                        <span className="sr-only">Save as favorite</span>
                      </button>
                    </div>
                    <div className="mt-4 ">
                      <dt className="sr-only">Users</dt>
                      <dd className="flex justify-start  -space-x-1">
                        {team.members.map((member) => (
                          <div className="relative" key={member.uid}>
                            <img
                              src={`https://ui-avatars.com/api/?name=${member.realName.replace(
                                ' ',
                                '+'
                              )}&color=24a23f&background=D6EBDA`}
                              alt={member.realName}
                              title={member.realName}
                              className="w-12 h-12 rounded-full bg-gray-100 ring-2 ring-white "
                              loading="lazy"
                            />
                            {member.is_manager && (
                              <div className="absolute bottom-0 left-0 bg-gray-700 p-0.5 rounded-full">
                                <ShieldCheckIcon className="w-4 h-4 text-gray-50" />
                              </div>
                            )}
                          </div>
                        ))}
                      </dd>
                    </div>
                    <ChildrenTeams teams={team.children} />
                  </dl>
                </li>
              ))}
              <li className="flex">
                <div className="group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-sm leading-6 text-gray-900 font-medium py-4 cursor-pointer hover:border-kona-green hover:border-solid hover:bg-white hover:text-kona-green ">
                  <PlusIcon className="mb-1 text-gray-400 group-hover:text-kona-green h-5 w-5" />
                  New team
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

/**
 * So I would praobly separate these functions into their own folder/files
 * so that the file remains concise, however for simplicity placing all
 * the bits of logic here.
 */

/**
 *  Sorting all the teams from the given users map
 */
const getTeams = (users: KonaUsers): Teams => {
  return Object.entries(users).reduce((acc, [key, value]) => {
    if (!value.teams) {
      return { ...acc }
    }
    const user_teams = Object.entries(value.teams).reduce((user_teams, [team_id, team_data]) => {
      return {
        ...user_teams,
        [`${key}&${team_id}`]: team_data,
      }
    }, {})
    return { ...acc, ...user_teams }
  }, {})
}
/**
 *  Getting the top of the Trees and working towards the branches
 */
const sortTeams = (teams: Teams, channels: KonaChannels, users: KonaUsers): TeamTree => {
  const primary_teams = Object.entries(teams).filter(
    ([team_id, team_data]) => !!team_data.settings.channel_id
  )
  return primary_teams.reduce((acc, [team_uid, team_data]) => {
    return {
      ...acc,
      [team_uid]: {
        ...resolveTeamLeaf(team_uid, team_data, teams, users),
        channel: channels[team_data.settings!.channel_id],
      },
    }
  }, {})
}
const resolveTeamLeaf = (
  team_uid: string,
  team: Team,
  teams: Teams,
  users: KonaUsers
): TeamLeaf => {
  const manager_uid = team_uid.split('&')[0]
  const all_members = [...team.directs, manager_uid]
  /**
   * When actually sorting the members onto an array noticed that
   * U01URC62FJL does not exist in the list of users
   */
  const members: Member[] = all_members
    .filter((row_uid) => users[row_uid])
    .map((uid) => {
      const { realName, s_manager } = users[uid]
      return { realName, is_manager: s_manager.includes(team_uid) || manager_uid === uid, uid }
    })
  if (!team.settings.consolidatedTeams) {
    return { ...team, members }
  }
  const children: Record<string, Team> = team.settings.consolidatedTeams.reduce(
    (children_teams, child_team_id) => {
      const child = teams[child_team_id]
      return {
        ...children_teams,
        [child_team_id]: { ...child },
      }
    },
    {}
  )
  return {
    ...team,
    members,
    children: Object.entries(children).reduce((acc, [team_uid, team_data]) => {
      return { ...acc, [team_uid]: resolveTeamLeaf(team_uid, team_data, teams, users) }
    }, {}),
  }
}

export const getServerSideProps = async () => {
  /**
   * No doubt that pagination and backend filtering as more teams and team members
   * get added ough to be be considred.
   */
  const users: KonaUsers = (await import('../../data/teams.json')).default
  const channels: KonaChannels = (await import('../../data/channels.json')).default

  const teams = getTeams(users)
  return {
    props: {
      sorted_teams: sortTeams(teams, channels, users),
    },
  }
}

export default Home
