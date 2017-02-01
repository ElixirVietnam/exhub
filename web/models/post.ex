defmodule ExHub.Post do
  @moduledoc false

  use ExHub.Web, :model
  alias ExHub.Repo

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

  def comments_query(post, _, _) do
    from c in ExHub.Comment,
      where: c.post_id == ^post.id,
      order_by: [asc: c.inserted_at]
  end

  def newest_posts_query(_, _, _) do
    from p in ExHub.Post,
      order_by: [desc: p.inserted_at]
  end

  def most_popular_posts_query(_, _, _) do
    from p in ExHub.Post,
      order_by: [desc: p.score]
  end

  def find_by_ids(_, ids) do
    unique_ids = ids |> MapSet.new |> MapSet.to_list
    query = from p in __MODULE__,
      where: p.id in ^unique_ids,
      order_by: [desc: p.inserted_at]

    query
    |> Repo.all
    |> Enum.reduce(%{}, fn item, acc ->
      Map.put(acc, to_string(item.id), item)
    end)
  end

  def find_tags_by_ids(_, ids) do
    unique_ids = ids |> MapSet.new |> MapSet.to_list
    query = from t in ExHub.Tag,
      left_join: pt in "posts_tags",
      where: pt.post_id in ^unique_ids and
             pt.tag_id == t.id,
      order_by: [desc: t.inserted_at],
      select: {pt.post_id, t}

    query
    |> Repo.all
    |> Enum.group_by(&elem(&1, 0), &elem(&1, 1))
  end
end
