defmodule ExHub.Services.Post.CreatePostService do
  @moduledoc false

  use ExHub.Web, :model
  alias ExHub.{Post, Category, Repo}

  def call(user, params) do
    category = Repo.get_by(Category, name: params[:category] || "")
    if category == nil do
      {:error, "Category does not exist"}
    else
      changeset =
        %Post{}
        |> Post.changeset(params)
        |> Ecto.Changeset.put_assoc(:user, user)
        |> Ecto.Changeset.put_assoc(:category, category)
      post = changeset |> Repo.insert!
      {:ok, %{post: post}}
    end
  end
end
