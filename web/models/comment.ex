defmodule ExHub.Comment do
  use Ecto.Schema

  schema "comments" do
    field :content
    field :likes_count, :integer, default: 0

    belongs_to :post, ExHub.Post
    belongs_to :user, ExHub.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> Ecto.Changeset.cast(params, [:content])
    |> Ecto.Changeset.validate_required([:content])
  end
end
