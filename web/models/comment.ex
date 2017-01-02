defmodule ExHub.Comment do
  use Ecto.Schema

  schema "comments" do
    field :content
    field :likes_count

    belongs_to :posts, ExHub.Post
    belongs_to :user, ExHub.User

    timestamps()
  end
end
