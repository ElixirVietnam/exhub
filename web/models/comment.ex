defmodule ExHub.Comment do
  use Ecto.Schema

  schema "comments" do
    field :content
    field :likes_count, :integer, default: 0

    belongs_to :post, ExHub.Post
    belongs_to :user, ExHub.User

    timestamps()
  end
end
