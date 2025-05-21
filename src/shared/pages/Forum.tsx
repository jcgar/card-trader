"use client"

import { useState } from "react"
import { AppLayout } from "@/shared/components/layout/AppLayout"
import { ForumHeader } from "@/shared/components/forum/ForumHeader"
import { DebateList } from "@/shared/components/forum/DebateList"
import { DebateView } from "@/shared/components/forum/DebateView"
import { Sidebar } from "@/shared/components/forum/Sidebar"
import { mockDebates, mockUsers } from "@/shared/use/data"
import { t } from "@/shared/use/i18n"

const Forum = () => {
  const [selectedDebate, setSelectedDebate] = useState(null)
  const [debates, setDebates] = useState(mockDebates)
  const [currentUser] = useState(mockUsers[0]) // Assuming the first user is logged in

  const handleCreateDebate = (newDebate) => {
    setDebates([newDebate, ...debates])
    // In a real app, we would also make an API call to save the new debate
  }

  const handleVote = (debateId, postId, voteType) => {
    setDebates(
      debates.map((debate) => {
        if (debate.id === debateId) {
          return {
            ...debate,
            posts: debate.posts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  votes_up: voteType === "up" ? post.votes_up + 1 : post.votes_up,
                  votes_down: voteType === "down" ? post.votes_down + 1 : post.votes_down,
                }
              }
              return post
            }),
          }
        }
        return debate
      }),
    )
    // In a real app, we would also make an API call to save the vote
  }

  const handleMarkBestAnswer = (debateId, postId) => {
    setDebates(
      debates.map((debate) => {
        if (debate.id === debateId) {
          return {
            ...debate,
            posts: debate.posts.map((post) => ({
              ...post,
              is_best_answer: post.id === postId,
            })),
          }
        }
        return debate
      }),
    )
    // In a real app, we would also make an API call to mark the best answer
  }

  const tabs = [
    {
      value: "debates",
      label: t("forum.debates"),
      content: selectedDebate ? (
        <DebateView
          debate={selectedDebate}
          onBack={() => setSelectedDebate(null)}
          onVote={handleVote}
          onMarkBestAnswer={handleMarkBestAnswer}
          currentUser={currentUser}
        />
      ) : (
        <DebateList debates={debates} onSelectDebate={setSelectedDebate} />
      ),
    },
    {
      value: "popular",
      label: t("forum.popular"),
      content: (
        <DebateList debates={debates.filter((debate) => debate.votes > 10)} onSelectDebate={setSelectedDebate} />
      ),
    },
    {
      value: "unanswered",
      label: t("forum.unanswered"),
      content: (
        <DebateList
          debates={debates.filter((debate) => debate.posts.length === 1)}
          onSelectDebate={setSelectedDebate}
        />
      ),
    },
  ]

  return (
    <AppLayout tabs={tabs} sidebarContent={<Sidebar />}>
      <ForumHeader onCreateDebate={handleCreateDebate} />
    </AppLayout>
  )
}

export default Forum

