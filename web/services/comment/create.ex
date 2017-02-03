defmodule ExHub.Services.Comment.CreateCommentService do
  @moduledoc false

  use ExHub.Web, :model
  alias ExHub.{Post, Comment, Repo}

  def call(user, params) do
    post = Repo.get(Post, params[:post_id] || "")
    if post == nil do
      {:error, "Post does not exist"}
    else
      changeset =
        %Comment{}
        |> Comment.changeset(params)
        |> Ecto.Changeset.put_assoc(:user, user)
        |> Ecto.Changeset.put_assoc(:post, post)
      comment = changeset |> Repo.insert!
      post_query = from p in Post, where: p.id == ^post.id
      Repo.update_all(post_query, inc: [comments_count: 1])
      {:ok, %{comment: comment}}
    end
  end
end

