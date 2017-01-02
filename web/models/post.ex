defmodule ExHub.Post do
  use ExHub.Web, :model

  schema "posts" do
    field :title
    field :content
    field :link
    field :comments_count, :integer
    field :likes_count, :integer
    field :score, :float

    belongs_to :user, ExHub.User
    belongs_to :category, ExHub.Category
    has_many :comments, ExHub.Comment
    many_to_many :tags, ExHub.Tag, join_through: "posts_tags"

    timestamps()
  end

  @fields ~w[title content link score]

  def changeset(struct, params \\ %{}) do
    struct
    |> Ecto.Changeset.cast(params, @fields)
  end

  def comments_query(post) do
    from c in ExHub.Comment,
      where: c.post_id == ^post.id,
      order_by: [asc: c.inserted_at]
  end
end
