/**
 * Tipos relacionados ao Git do Sentinel.
 */

export type GitStatusType = 'clean' | 'modified' | 'staged' | 'untracked' | 'conflicted'

export interface GitFileChange {
  path: string
  status: GitStatusType
  staged: boolean
  insertions: number
  deletions: number
}

export interface GitCommit {
  hash: string
  shortHash: string
  message: string
  author: string
  date: string // ISO
  isHead: boolean
}

export interface GitBranch {
  name: string
  isCurrent: boolean
}

export interface GitDiffHunk {
  oldStart: number
  oldLines: number
  newStart: number
  newLines: number
  content: string
}
