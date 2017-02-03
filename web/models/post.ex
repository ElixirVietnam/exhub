defmodule ExHub.Post do
  @moduledoc false

  use ExHub.Web, :model
  alias ExHub.Repo

  schema "posts" do
    field :title
    field :content
    field :link
    field :thumbnail_url, :string, default: ""
    field :comments_count, :integer, default: 0
    field :likes_count, :integer, default: 0
    field :score, :float, default: 0.0

    belongs_to :user, ExHub.User
    belongs_to :category, ExHub.Category
    has_many :comments, ExHub.Comment
    many_to_many :tags, ExHub.Tag, join_through: "posts_tags"

    timestamps()
  end

  @fields ~w[title content link thumbnail_url]
  def changeset(struct, params \\ %{}) do
    struct
    |> Ecto.Changeset.cast(params, @fields)
    |> Ecto.Changeset.validate_required([:title, :content])
    |> Ecto.Changeset.put_assoc(:tags, parse_tags(params))
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

  defp parse_tags(params) do
	(params[:tags] || "")
    |> String.split(",")
    |> Enum.map(&String.trim/1)
    |> Enum.reject(& &1 == "")
    |> insert_and_get_all
  end

  defp insert_and_get_all([]) do
    []
  end
  defp insert_and_get_all(names) do
    maps = Enum.map(names, &%{
      name: &1,
      inserted_at: Ecto.DateTime.utc,
      updated_at: Ecto.DateTime.utc
    })
    Repo.insert_all ExHub.Tag, maps, on_conflict: :nothing
    Repo.all from t in ExHub.Tag, where: t.name in ^names
  end
end
